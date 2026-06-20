# AI Interview Preparation Agent

## Overview

AI Interview Preparation Agent is an Agentic AI-powered platform that helps students prepare for technical interviews using their own study materials.

Users can upload PDFs, ask questions, generate interview questions, participate in mock interviews, receive AI-based evaluations, analyze their strengths and weaknesses, and obtain personalized study plans.

The system combines Retrieval-Augmented Generation (RAG), Vector Search, Large Language Models, and Agentic Workflows to create a personalized interview coaching experience.

---

## Features

### Authentication Agent

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* User-Specific Data Isolation

---

### Knowledge Base Agent

* Upload Technical PDFs
* Extract Text from PDFs
* Automatic Text Chunking
* Duplicate Upload Prevention
* User-Specific Document Storage

---

### Retrieval-Augmented Generation (RAG)

* Semantic Search using ChromaDB
* Context-Aware Question Answering
* Personalized Responses based on Uploaded Notes

---

### Interview Agent

* Topic-Based Interview Generation
* Dynamic Interview Sessions
* Continuous Question Flow
* Interview State Management
* Question Tracking

---

### Evaluation Agent

* AI-Based Answer Evaluation
* Interview-Style Feedback
* Strength Analysis
* Weakness Detection
* Scoring Mechanism

---

### Learning Agent

* Interview Analytics
* Personalized Study Plans
* Practice Question Generation
* Learning Progress Tracking
* Re-Interview Recommendations

---

## System Architecture

User
↓
Authentication
↓
Upload Notes
↓
PDF Processing
↓
Chunking
↓
ChromaDB
↓
Semantic Search
↓
RAG Pipeline
↓
Interview Agent
↓
Evaluation Agent
↓
Learning Agent

---

## Tech Stack

### Backend

* Python
* FastAPI
* JWT Authentication

### Database

* MongoDB

### Vector Database

* ChromaDB

### AI / LLM

* Google Gemini
* LangChain

### Document Processing

* PyPDF

---

## Project Structure

backend/

app/

├── ai/

├── database/

├── dependencies/

├── models/

├── rag/

├── routes/

│ ├── auth.py

│ ├── notes.py

│ ├── ask.py

│ ├── interview.py

│ └── learning.py

├── utils/

└── main.py

---

## Implemented APIs

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

POST /ask

---

### Interview

POST /interview/start

POST /interview/answer

POST /interview/end

GET /interview/analytics

GET /interview/study-plan

GET /interview/practice

GET /interview/recommendation

---

### Learning

POST /learning/complete

GET /learning/progress

---

## Current Agent Status

| Agent            | Status          |
| ---------------- | --------------- |
| Interview Agent  | Completed       |
| Evaluation Agent | Completed       |
| Learning Agent   | Completed (MVP) |
| Resume Agent     | Planned         |
| Career Agent     | Planned         |

---

## Future Enhancements

### Resume Agent

* Resume Upload
* Resume Analysis
* ATS Score
* Skill Gap Detection

### Career Agent

* Resume vs Job Description Matching
* Missing Skills Identification
* Career Recommendations

### Frontend

* React Dashboard
* Interview Interface
* Analytics Dashboard
* Study Plan Dashboard
* Learning Progress Dashboard

### Advanced Agentic AI

* Multi-Agent Orchestration
* LangGraph Integration
* Adaptive Interview Difficulty
* Voice-Based Interviews

---

## Learning Outcomes

This project demonstrates:

* Agentic AI Workflows
* Retrieval-Augmented Generation (RAG)
* Vector Databases
* LLM Integration
* JWT Authentication
* FastAPI Development
* MongoDB Integration
* ChromaDB Integration
* AI-Powered Interview Evaluation
* Personalized Learning Systems

---

## Author

Sushanth Reddy

B.Tech Information Technology

Chaitanya Bharathi Institute of Technology (CBIT)

Hyderabad, India
