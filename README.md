# AI Interview Preparation Agent

## Overview

AI Interview Preparation Agent is an intelligent interview preparation platform that helps users learn and revise technical subjects using their own study materials.

Users can upload PDF notes, ask questions, generate interview questions, and participate in AI-driven mock interviews powered by Retrieval-Augmented Generation (RAG).

The system combines FastAPI, MongoDB, ChromaDB, and Gemini to create a personalized interview preparation experience.

---

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected API Endpoints

### Knowledge Base

* PDF Upload
* Automatic Text Extraction
* Intelligent Text Chunking
* User-Specific Document Ownership

### RAG Pipeline

* Semantic Search using ChromaDB
* Vector Embeddings
* Context Retrieval
* AI-Powered Question Answering

### Interview Preparation

* Generate Easy, Medium, and Hard Interview Questions
* Topic-Based Question Generation
* Personalized Knowledge Retrieval

### Interview Sessions

* Start AI Mock Interviews
* Session Tracking
* User-Specific Interview History

---

## System Architecture

User Uploads PDF

↓

PDF Text Extraction

↓

Text Chunking

↓

ChromaDB Vector Storage

↓

Semantic Retrieval

↓

Gemini LLM

↓

Question Answering / Interview Question Generation

---

## Tech Stack

### Backend

* FastAPI
* Python

### Database

* MongoDB

### Vector Database

* ChromaDB

### AI & RAG

* Gemini 2.5 Flash
* LangChain
* Sentence Transformers

### Authentication

* JWT
* Passlib

### PDF Processing

* PyPDF

---

## Project Structure

backend/

├── app/

│   ├── ai/

│   │   └── llm.py

│   ├── database/

│   │   └── mongodb.py

│   ├── dependencies/

│   │   └── auth_dependency.py

│   ├── rag/

│   │   ├── chunking.py

│   │   └── vector_store.py

│   ├── routes/

│   │   ├── auth.py

│   │   ├── notes.py

│   │   ├── search.py

│   │   ├── ask.py

│   │   ├── question_generator.py

│   │   └── interview.py

│   ├── utils/

│   └── main.py

│

├── chroma_db/

├── temp/

├── .env

└── requirements.txt

---

## API Endpoints

### Authentication

POST /auth/register

POST /auth/login

GET /auth/me

---

### Notes

POST /notes/upload

---

### Search

POST /search

---

### Question Answering

POST /ask

---

### Interview Question Generation

POST /generate-questions

---

### Interview Session

POST /interview/start

---

## Current Workflow

1. User uploads PDF notes.
2. Text is extracted and chunked.
3. Chunks are converted into vector embeddings.
4. Chunks are stored in ChromaDB.
5. Metadata is stored in MongoDB.
6. User asks questions or generates interview questions.
7. Relevant chunks are retrieved.
8. Gemini generates responses using retrieved context.

---

## Future Enhancements

* Interview Answer Evaluation
* AI Feedback Generation
* Weak Topic Detection
* Personalized Learning Plans
* Multi-Agent Workflows using LangGraph
* Resume-Based Interview Preparation
* Voice-Based Mock Interviews
* Performance Analytics Dashboard

---

## Author

Sushanth Reddy

B.Tech Information Technology

Chaitanya Bharathi Institute of Technology (CBIT)
