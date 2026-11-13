from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
import os
import uuid
from app.rag.chunking import chunk_text
from app.dependencies.auth_dependency import get_current_user
from app.rag.vector_store import store_chunks
from app.database.mongodb import notes_collection
from app.utils.pdf_utils import extract_text_from_pdf

router = APIRouter()

TEMP_FOLDER = "temp"

os.makedirs(
    TEMP_FOLDER,
    exist_ok=True
)

@router.get("/")
def get_user_notes(current_user=Depends(get_current_user)):
    notes = list(notes_collection.find(
        {"user_email": current_user["email"]},
        {"_id": 0, "filename": 1, "text_length": 1, "chunks_count": 1}
    ).sort("_id", -1))
    return {"notes": notes}

@router.post("/upload")
async def upload_note(
    file: UploadFile = File(...),
    current_user=Depends(get_current_user)
):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are supported"
        )

    try:
        existing_note = notes_collection.find_one(
            {
                "user_email": current_user["email"],
                "filename": file.filename
            }
        )
    except Exception as e:
        print(f"MongoDB connection error: {e}")
        raise HTTPException(
            status_code=503,
            detail="Database connection error. Please check your MongoDB connection and network access."
        )

    if existing_note:
        return {
            "message": "File already uploaded",
            "filename": file.filename
        }

    # Generate unique filename
    unique_filename = (
        str(uuid.uuid4()) + ".pdf"
    )

    # Temporary path
    filepath = os.path.join(
        TEMP_FOLDER,
        unique_filename
    )

    try:
        # Save uploaded file temporarily
        with open(filepath, "wb") as buffer:
            content = await file.read()
            buffer.write(content)

        # Extract PDF text
        text = extract_text_from_pdf(filepath)

        if not text or not text.strip():
            raise HTTPException(
                status_code=400,
                detail="Could not extract text from the PDF. The file may be scanned or empty."
            )

        chunks = chunk_text(text)

        if not chunks:
            raise HTTPException(
                status_code=400,
                detail="No readable content found in PDF after processing."
            )

        store_chunks(
            chunks,
            {
                "user_email": current_user["email"],
                "filename": file.filename
            }
        )

        # Store metadata
        notes_collection.insert_one(
            {
                "user_email": current_user["email"],
                "filename": file.filename,
                "text_length": len(text),
                "chunks_count": len(chunks)
            }
        )

        return {
            "message": "PDF processed successfully",
            "user_email": current_user["email"],
            "filename": file.filename,
            "text_length": len(text),
            "chunks_count": len(chunks)
        }
    finally:
        # Clean up temporary PDF
        if os.path.exists(filepath):
            os.remove(filepath)