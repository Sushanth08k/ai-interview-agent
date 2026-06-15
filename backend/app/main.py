from fastapi import FastAPI
from app.routes.search import router as search_router
from app.routes.auth import router as auth_router
from app.routes.notes import router as notes_router

app = FastAPI()

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