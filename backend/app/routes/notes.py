from fastapi import APIRouter, UploadFile, File
import os
import uuid
from app.rag.chunking import chunk_text
from fastapi import Depends
from app.dependencies.auth_dependency import get_current_user

from app.database.mongodb import notes_collection
from app.utils.pdf_utils import extract_text_from_pdf

router = APIRouter()

TEMP_FOLDER = "temp"

os.makedirs(
    TEMP_FOLDER,
    exist_ok=True
)

@router.post("/upload")
async def upload_note(
    file: UploadFile = File(...),
    current_user=Depends(get_current_user)
):

    # Generate unique filename
    unique_filename = (
        str(uuid.uuid4()) + ".pdf"
    )

    # Temporary path
    filepath = os.path.join(
        TEMP_FOLDER,
        unique_filename
    )

    # Save uploaded file temporarily
    with open(filepath, "wb") as buffer:

        content = await file.read()

        buffer.write(content)

    # Extract PDF text
    text = extract_text_from_pdf(
        filepath
    )
    chunks = chunk_text(text)

    # Delete temporary PDF
    os.remove(filepath)

    # Store metadata
    notes_collection.insert_one(
    {
        "user_email": current_user["email"],
        "filename": file.filename,
        "text_length": len(text),
        "chunks_count": len(chunks)
    }
)

    # Response
    return {
        "message": "PDF processed successfully",
        "user_email": current_user["email"],
        "filename": file.filename,
        "text_length": len(text),
        "chunks_count": len(chunks)
    }