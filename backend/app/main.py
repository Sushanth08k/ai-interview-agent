from fastapi import FastAPI
from app.routes.search import router as search_router
from app.routes.auth import router as auth_router
from app.routes.notes import router as notes_router
from app.routes.ask import router as ask_router
from app.routes.question_generator import router as question_router
from app.routes.interview import router as interview_router
from app.routes.learning import (
    router as learning_router
)
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]
)

app.include_router(
    auth_router,
    prefix="/auth",
    tags=["Authentication"]
)

app.include_router(
    notes_router,
    prefix="/notes",
    tags=["Notes"]
)

@app.get("/")
def home():
    return {
        "message": "AI Interview Agent Running"
    }

app.include_router(
    search_router,
    prefix="/search",
    tags=["Search"]
)

app.include_router(
    ask_router,
    prefix="/ask",
    tags=["Ask AI"]
)

app.include_router(
    question_router,
    prefix="/generate-questions",
    tags=["Question Generator"]
)

app.include_router(
    interview_router,
    prefix="/interview",
    tags=["Interview"]
)

app.include_router(
    learning_router,
    prefix="/learning",
    tags=["Learning"]
)