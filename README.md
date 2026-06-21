# AI Interview Coach

An AI-powered interview preparation platform that helps students learn from their own notes, practice mock interviews, receive AI-generated feedback, and follow personalized learning plans.

---

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* User-Specific Data Access

### Knowledge Base

* PDF Upload
* PDF Text Extraction
* Automatic Chunking
* Duplicate Upload Prevention
* User-Specific Note Storage

### Retrieval-Augmented Generation (RAG)

* Semantic Search using ChromaDB
* Context-Aware Question Answering
* Personalized Responses from Uploaded Notes

### Interview Agent

* Topic-Based Interview Generation
* Dynamic Question Generation
* Continuous Interview Sessions
* Interview Progress Tracking
* Session Management

### Evaluation Agent

* AI-Based Answer Evaluation
* Interview Feedback
* Strength Analysis
* Weakness Analysis
* Performance Scoring

### Learning Agent

* Interview Analytics
* Personalized Study Plans
* Practice Question Generation
* Learning Progress Tracking
* Re-Interview Recommendations

---

# System Architecture

User
↓
React Frontend
↓
FastAPI Backend
↓
Authentication Layer
↓
PDF Processing
↓
ChromaDB Vector Store
↓
Gemini LLM
↓
Agent Layer

Interview Agent

Evaluation Agent

Learning Agent

---

# Tech Stack

## Frontend

* React
* Vite
* React Router DOM
* Axios

## Backend

* FastAPI
* Python

## Database

* MongoDB

## Vector Database

* ChromaDB

## AI / LLM

* Google Gemini
* LangChain

## Document Processing

* PyPDF

---

# Project Structure

```text
AI-Interview-Coach/

├── backend/
│
│   ├── app/
│   │
│   │   ├── ai/
│   │   ├── database/
│   │   ├── dependencies/
│   │   ├── models/
│   │   ├── rag/
│   │   ├── routes/
│   │   │   ├── auth.py
│   │   │   ├── notes.py
│   │   │   ├── ask.py
│   │   │   ├── interview.py
│   │   │   └── learning.py
│   │   ├── utils/
│   │   └── main.py
│
│   └── requirements.txt
│
├── frontend/
│
│   ├── src/
│   │
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── UploadNotes.jsx
│   │   │   ├── Interview.jsx
│   │   │   ├── Analytics.jsx
│   │   │   └── StudyPlan.jsx
│   │
│   │   ├── services/
│   │   │   └── api.js
│   │
│   │   ├── App.jsx
│   │   └── main.jsx
│
│   └── package.json
│
└── README.md
```

---

# Backend APIs

## Authentication

```http
POST /auth/register
POST /auth/login
GET  /auth/me
```

## Notes

```http
POST /notes/upload
```

## RAG

```http
POST /search
POST /ask
```

## Interview

```http
POST /interview/start
POST /interview/answer
POST /interview/end

GET  /interview/analytics
GET  /interview/study-plan
GET  /interview/practice
GET  /interview/recommendation
```

## Learning

```http
POST /learning/complete
GET  /learning/progress
```

---

# Frontend Pages

### Authentication

* Login
* Register

### Dashboard

* Upload Notes
* Mock Interview
* Analytics
* Study Plan
* Logout

### Interview

* Start Interview
* Submit Answers
* Receive Feedback
* Track Scores
* End Interview

### Analytics

* Questions Answered
* Total Score
* Average Score
* AI Performance Analysis

### Study Plan

* Personalized Learning Plan
* Weak Topic Identification
* Recommended Revision Areas

---

# Current Agent Status

| Agent            | Status          |
| ---------------- | --------------- |
| Interview Agent  | Completed       |
| Evaluation Agent | Completed       |
| Learning Agent   | Completed (MVP) |
| Resume Agent     | Planned         |
| Career Agent     | Planned         |

---

# Future Roadmap

## Resume Agent

* Resume Upload
* ATS Score Generation
* Resume Analysis
* Skill Gap Detection

## Career Agent

* Resume vs Job Description Matching
* Missing Skill Identification
* Career Recommendations

## Multi-Agent Architecture

Planned LangGraph Integration:

* Supervisor Agent
* Interview Agent
* Evaluation Agent
* Learning Agent
* Resume Agent
* Career Agent

## Frontend Enhancements

* Dark Theme
* Dashboard Cards
* Charts & Analytics
* Progress Visualization
* Responsive Design

---

# Learning Outcomes

This project demonstrates:

* Retrieval-Augmented Generation (RAG)
* Agentic AI Design
* Semantic Search
* Vector Databases
* JWT Authentication
* FastAPI Development
* React Frontend Development
* MongoDB Integration
* ChromaDB Integration
* Gemini LLM Integration
* AI-Powered Interview Coaching

---

# Author

Sushanth Reddy

B.Tech Information Technology

Chaitanya Bharathi Institute of Technology (CBIT)

Hyderabad, India
