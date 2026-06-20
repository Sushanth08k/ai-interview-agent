from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

client = MongoClient(
    os.getenv("MONGO_URI")
)

db = client[
    os.getenv("DATABASE_NAME")
]

users_collection = db["users"]

notes_collection = db["notes"]

interviews_collection = db["interviews"]

learning_progress_collection = db[
    "learning_progress"
]