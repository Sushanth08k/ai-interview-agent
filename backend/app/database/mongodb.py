from pymongo import MongoClient
from dotenv import load_dotenv
from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent.parent
load_dotenv(BASE_DIR / ".env")
load_dotenv()

mongo_uri = os.getenv("MONGO_URI", "mongodb://localhost:27017")
database_name = os.getenv("DATABASE_NAME", "ai_interview_agent")

client = MongoClient(mongo_uri)
db = client[database_name]

users_collection = db["users"]

notes_collection = db["notes"]

interviews_collection = db["interviews"]

learning_progress_collection = db[
    "learning_progress"
]