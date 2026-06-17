from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.dependencies.auth_dependency import get_current_user
from app.rag.vector_store import search_chunks
from app.ai.llm import llm

router = APIRouter()


class QuestionRequest(BaseModel):
    topic: str


@router.post("/")
def generate_questions(
    request: QuestionRequest,
    current_user=Depends(get_current_user)
):

    results = search_chunks(
        request.topic,
        current_user["email"],
        n_results=5
    )

    documents = results["documents"][0]

    context = "\n\n".join(
        documents
    )

    prompt = f"""
You are a technical interviewer.

Using the context below, generate:

1. 5 Easy Questions
2. 5 Medium Questions
3. 5 Hard Questions

Context:
{context}

Topic:
{request.topic}
"""

    response = llm.invoke(
        prompt
    )

    return {
        "questions": response.content
    }