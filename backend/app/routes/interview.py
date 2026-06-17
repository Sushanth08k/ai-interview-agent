from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.dependencies.auth_dependency import get_current_user
from app.rag.vector_store import search_chunks
from app.ai.llm import llm
from app.database.mongodb import interviews_collection

router = APIRouter()


class InterviewRequest(BaseModel):
    topic: str


@router.post("/start")
def start_interview(
    request: InterviewRequest,
    current_user=Depends(get_current_user)
):

    results = search_chunks(
        request.topic,
        current_user["email"],
        n_results=5
    )

    # No relevant notes found
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
        "score": 0,
        "status": "active"
    }

    interviews_collection.insert_one(
        session
    )

    return {
        "question": response.content
    }