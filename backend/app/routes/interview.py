from fastapi import APIRouter, Depends
from pydantic import BaseModel
import re
from app.dependencies.auth_dependency import get_current_user
from app.rag.vector_store import search_chunks
from app.ai.llm import llm
from app.database.mongodb import interviews_collection

router = APIRouter()


class InterviewRequest(BaseModel):
    topic: str


class AnswerRequest(BaseModel):
    answer: str


@router.post("/start")
def start_interview(
    request: InterviewRequest,
    current_user=Depends(get_current_user)
):

    # Close previous active interview if exists
    interviews_collection.update_many(
        {
            "user_email": current_user["email"],
            "status": "active"
        },
        {
            "$set": {
                "status": "completed"
            }
        }
    )

    results = search_chunks(
        request.topic,
        current_user["email"],
        n_results=5
    )

    if not results["documents"] or not results["documents"][0]:
        return {
            "message": "No relevant notes found"
        }

    documents = results["documents"][0]

    context = "\n\n".join(documents)

    prompt = f"""
You are a technical interviewer.

Generate ONE interview question.

Rules:
- Ask only one question.
- Do not provide the answer.
- Make it interview-level.
- Keep it concise.

Topic:
{request.topic}

Context:
{context}
"""

    response = llm.invoke(prompt)

    session = {
        "user_email": current_user["email"],
        "topic": request.topic,
        "current_question": response.content,
        "questions_answered": 0,
        "total_score": 0,
        "status": "active",
        "history": []
    }

    interviews_collection.insert_one(session)

    return {
        "question": response.content
    }


@router.post("/answer")
def submit_answer(
    request: AnswerRequest,
    current_user=Depends(get_current_user)
):

    session = interviews_collection.find_one(
        {
            "user_email": current_user["email"],
            "status": "active"
        }
    )

    if not session:
        return {
            "message": "No active interview session found"
        }
    
    if session["questions_answered"] >= 5:
        return {
            "message": "Interview completed. Please end the interview."
        }

    

    question = session["current_question"]

    evaluation_prompt = f"""
You are a technical interviewer.

Question:
{question}

Candidate Answer:
{request.answer}

Evaluate as an interviewer.

Scoring Guide:

9-10:
Strong interview answer with correct concepts.

7-8:
Good answer with minor omissions.

5-6:
Partial understanding.

0-4:
Major conceptual errors.

Provide:

Score: X/10

Strengths:
- ...

Weaknesses:
- ...

Suggestions:
- ...
"""

    evaluation = llm.invoke(
        evaluation_prompt
    )

    # TODO:
    # Later we will extract actual score using regex.
    # For now keep default score.

    match = re.search(
        r"Score:\s*(\d+)",
        evaluation.content
    )

    if match:
        score = int(match.group(1))
    else:
        score = 0

    topic = session["topic"]

    results = search_chunks(
        topic,
        current_user["email"],
        n_results=5
    )

    documents = results["documents"][0]

    context = "\n\n".join(
        documents
    )

    asked_questions = []

    for item in session.get(
        "history",
        []
    ):
        asked_questions.append(
            item["question"]
        )

    previous_questions = "\n".join(
        asked_questions
    )

    next_question_prompt = f"""
You are a technical interviewer.

Generate ONE NEW interview question.

Topic:
{topic}

Context:
{context}

Previously Asked Questions:
{previous_questions}

Rules:
- Ask only one question.
- Do not provide the answer.
- Do not repeat previous questions.
- Make it interview level.
"""
    
    next_question = llm.invoke(
        next_question_prompt
    )

    interviews_collection.update_one(
        {
            "_id": session["_id"]
        },
        {
            "$set": {
                "current_question":
                next_question.content
            },

            "$inc": {
                "questions_answered": 1,
                "total_score": score
            },

            "$push": {
                "history": {
                    "question": question,
                    "answer": request.answer,
                    "score": score
                }
            }
        }
    )

    updated_session = interviews_collection.find_one(
        {
            "_id": session["_id"]
        }
    )

    avg_score = (
        updated_session["total_score"]
        /
        updated_session["questions_answered"]
    )

    return {
        "evaluation":
        evaluation.content,

        "next_question":
        next_question.content,

        "questions_answered":
        updated_session["questions_answered"],

        "total_score":
        updated_session["total_score"],

        "average_score":
        round(avg_score, 2)
    }

@router.post("/end")
def end_interview(
    current_user=Depends(get_current_user)
):

    session = interviews_collection.find_one(
        {
            "user_email": current_user["email"],
            "status": "active"
        }
    )

    if not session:
        return {
            "message": "No active interview found"
        }

    questions_answered = session.get(
        "questions_answered",
        0
    )

    total_score = session.get(
        "total_score",
        0
    )

    average_score = 0

    if questions_answered > 0:
        average_score = (
            total_score /
            questions_answered
        )

    summary_prompt = f"""
You are an interview coach.

Interview Statistics:

Questions Answered:
{questions_answered}

Total Score:
{total_score}

Average Score:
{average_score}

Generate:

1. Performance Summary
2. Strengths
3. Areas for Improvement

Keep the response concise.
"""

    summary = llm.invoke(
        summary_prompt
    )

    interviews_collection.update_one(
        {
            "_id": session["_id"]
        },
        {
            "$set": {
                "status": "completed"
            }
        }
    )

    return {
        "questions_answered":
        questions_answered,

        "total_score":
        total_score,

        "average_score":
        round(
            average_score,
            2
        ),

        "summary":
        summary.content
    }

@router.get("/analytics")
def interview_analytics(
    current_user=Depends(get_current_user)
):

    session = interviews_collection.find_one(
        {
            "user_email": current_user["email"]
        },
        sort=[
            ("questions_answered", -1)
        ]
    )

    if not session:
        return {
            "message": "No interview history found"
        }

    history = session.get(
        "history",
        []
    )

    if len(history) == 0:
        return {
            "message": "No interview attempts found"
        }

    history_text = ""

    for item in history:

        history_text += f"""

Question:
{item['question']}

Answer:
{item['answer']}

Score:
{item['score']}/10

"""

    prompt = f"""
You are an expert interview coach.

Analyze the interview performance below.

Interview History:

{history_text}

Provide:

1. Strong Topics
2. Weak Topics
3. Key Mistakes
4. Recommendations
5. Personalized Study Plan

Keep the response concise and structured.
"""

    analysis = llm.invoke(
        prompt
    )

    questions_answered = session.get(
        "questions_answered",
        0
    )

    total_score = session.get(
        "total_score",
        0
    )

    average_score = 0

    if questions_answered > 0:
        average_score = (
            total_score /
            questions_answered
        )

    return {
        "questions_answered":
        questions_answered,

        "total_score":
        total_score,

        "average_score":
        round(
            average_score,
            2
        ),

        "analysis":
        analysis.content
    }

@router.get("/study-plan")
def generate_study_plan(
    current_user=Depends(get_current_user)
):

    session = interviews_collection.find_one(
        {
            "user_email": current_user["email"]
        },
        sort=[("_id", -1)]
    )

    if not session:
        return {
            "message": "No interview history found"
        }

    history = session.get(
        "history",
        []
    )

    if len(history) == 0:
        return {
            "message": "No interview attempts found"
        }

    history_text = ""

    for item in history:

        history_text += f"""
Question:
{item['question']}

Answer:
{item['answer']}

Score:
{item['score']}/10

"""

    average_score = 0

    questions_answered = session.get(
        "questions_answered",
        0
    )

    total_score = session.get(
        "total_score",
        0
    )

    if questions_answered > 0:

        average_score = (
            total_score /
            questions_answered
        )

    prompt = f"""
You are an expert interview coach.

Analyze the interview history below.

Interview History:
{history_text}

Average Score:
{average_score}

Generate:

1. Strong Topics
2. Weak Topics
3. Important Concepts To Revise
4. 7-Day Study Plan
5. Recommended Interview Practice Areas

Keep the response concise and structured.
"""

    study_plan = llm.invoke(
        prompt
    )

    return {

        "questions_answered":
        questions_answered,

        "total_score":
        total_score,

        "average_score":
        round(
            average_score,
            2
        ),

        "study_plan":
        study_plan.content
    }


@router.get("/practice")
def generate_practice_questions(
    current_user=Depends(get_current_user)
):

    session = interviews_collection.find_one(
        {
            "user_email": current_user["email"]
        },
        sort=[("_id", -1)]
    )

    if not session:
        return {
            "message": "No interview history found"
        }

    history = session.get(
        "history",
        []
    )

    if len(history) == 0:
        return {
            "message": "No interview attempts found"
        }

    history_text = ""

    for item in history:

        history_text += f"""

Question:
{item['question']}

Answer:
{item['answer']}

Score:
{item['score']}/10

"""

    prompt = f"""
You are an expert interview coach.

Analyze this interview history.

{history_text}

Identify the weakest topic.

Generate:

1. Weak Topic
2. 10 Practice Questions

Return in a structured format.
"""

    response = llm.invoke(
        prompt
    )

    return {
        "practice":
        response.content
    }


@router.get("/recommendation")
def get_recommendation(
    current_user=Depends(get_current_user)
):

    session = interviews_collection.find_one(
        {
            "user_email": current_user["email"]
        },
        sort=[("_id", -1)]
    )

    if not session:
        return {
            "message": "No interview history found"
        }

    history = session.get(
        "history",
        []
    )

    if len(history) == 0:
        return {
            "message": "No interview attempts found"
        }

    history_text = ""

    for item in history:

        history_text += f"""
Question:
{item['question']}

Answer:
{item['answer']}

Score:
{item['score']}/10
"""

    prompt = f"""
You are an expert interview coach.

Analyze this interview history.

{history_text}

Provide:

1. Recommended Interview Topic
2. Reason
3. Expected Learning Outcome

Keep response concise.
"""

    response = llm.invoke(
        prompt
    )

    return {
        "recommendation":
        response.content
    }