from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.dependencies.auth_dependency import get_current_user
from app.database.mongodb import (
    learning_progress_collection
)

router = APIRouter()


class LearningRequest(BaseModel):
    topic: str


@router.post("/complete")
def mark_topic_completed(
    request: LearningRequest,
    current_user=Depends(get_current_user)
):

    existing = learning_progress_collection.find_one(
        {
            "user_email":
            current_user["email"],

            "topic":
            request.topic
        }
    )

    if existing:
        return {
            "message":
            "Topic already completed"
        }

    learning_progress_collection.insert_one(
        {
            "user_email":
            current_user["email"],

            "topic":
            request.topic,

            "status":
            "completed"
        }
    )

    return {
        "message":
        "Topic marked completed"
    }


@router.get("/progress")
def get_progress(
    current_user=Depends(get_current_user)
):

    progress = list(
        learning_progress_collection.find(
            {
                "user_email":
                current_user["email"]
            },
            {
                "_id": 0
            }
        )
    )

    return {
        "completed_topics":
        progress
    }