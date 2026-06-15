from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.dependencies.auth_dependency import get_current_user
from app.rag.vector_store import search_chunks

router = APIRouter()


class SearchRequest(BaseModel):
    query: str


@router.post("/")
def search_notes(
    request: SearchRequest,
    current_user=Depends(get_current_user)
):

    results = search_chunks(
        request.query,
        current_user["email"]
    )

    return results