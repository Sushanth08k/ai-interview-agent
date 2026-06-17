from fastapi import APIRouter
from fastapi import Depends

from pydantic import BaseModel

from app.dependencies.auth_dependency import get_current_user

from app.rag.vector_store import search_chunks

from app.ai.llm import llm

router = APIRouter()


class AskRequest(BaseModel):
    question: str


@router.post("/")
def ask_question(
    request: AskRequest,
    current_user=Depends(get_current_user)
):

    results = search_chunks(
        request.question,
        current_user["email"]
    )

    print("\n\nRETRIEVED DOCUMENTS:\n")

    documents = results["documents"][0]
    
    for i, doc in enumerate(documents):
        print(f"\nChunk {i+1}:\n")
        print(doc)
        print("-" * 50)
    context = "\n\n".join(
        documents
    )

    prompt = f"""
You are an interview preparation assistant.

Answer ONLY using the context below.

Context:
{context}

Question:
{request.question}
"""

    response = llm.invoke(
        prompt
    )

    return {
        "answer":
        response.content
    }