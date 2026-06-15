import chromadb

client = chromadb.PersistentClient(
    path="chroma_db"
)

collection = client.get_or_create_collection(
    name="interview_notes"
)

import uuid

def store_chunks(
    chunks,
    metadata
):

    ids = []

    metadatas = []

    for chunk in chunks:

        ids.append(
            str(uuid.uuid4())
        )

        metadatas.append(
            metadata
        )

    collection.add(
        ids=ids,
        documents=chunks,
        metadatas=metadatas
    )

def search_chunks(
    query,
    user_email,
    n_results=3
):

    results = collection.query(
        query_texts=[query],
        n_results=n_results,
        where={
            "user_email": user_email
        }
    )

    return results