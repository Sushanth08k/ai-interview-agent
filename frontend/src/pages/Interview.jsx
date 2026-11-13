import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/Layout";
import {
  Play,
  Send,
  StopCircle,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  Award,
  Hash,
  X,
  BarChart3,
  LayoutDashboard
} from "lucide-react";

export default function Interview() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [evaluation, setEvaluation] = useState("");
  const [stats, setStats] = useState(null);
  const [loadingStart, setLoadingStart] = useState(false);
  const [loadingAnswer, setLoadingAnswer] = useState(false);
  const [loadingEnd, setLoadingEnd] = useState(false);
  const [endSummary, setEndSummary] = useState(null);

  const startInterview = async () => {
    if (!topic.trim()) return;
    try {
      setLoadingStart(true);
      const res = await api.post("/interview/start", { topic });
      setQuestion(res.data.question);
      setEvaluation("");
      setStats(null);
      setEndSummary(null);
    } catch (error) {
      console.log(error);
      alert("Failed to start interview");
    } finally {
      setLoadingStart(false);
    }
  };

  const submitAnswer = async () => {
    if (!answer.trim()) return;
    try {
      setLoadingAnswer(true);
      const res = await api.post("/interview/answer", { answer });
      setEvaluation(res.data.evaluation);
      setQuestion(res.data.next_question);
      setStats({
        questionsAnswered: res.data.questions_answered,
        totalScore: res.data.total_score,
        averageScore: res.data.average_score,
      });
      setAnswer("");
    } catch (error) {
      console.log(error);
      alert("Failed to submit answer");
    } finally {
      setLoadingAnswer(false);
    }
  };

  const endInterview = async () => {
    try {
      setLoadingEnd(true);
      const res = await api.post("/interview/end");
      setEndSummary({
        summary: res.data.summary,
        questionsAnswered: res.data.questions_answered,
        totalScore: res.data.total_score,
        averageScore: res.data.average_score,
      });
      setQuestion("");
      setAnswer("");
      setEvaluation("");
      setStats(null);
      setTopic("");
    } catch (error) {
      console.log(error);
      alert("Failed to end interview");
    } finally {
      setLoadingEnd(false);
    }
  };

  const closeSummary = () => {
    setEndSummary(null);
  };

  return (
    <Layout title="Mock Interview" subtitle="Practice interviews with AI-generated questions and get instant feedback.">

      {/* End Interview Summary Modal */}
      {endSummary && (
        <div className="modal-overlay" onClick={closeSummary}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeSummary}>
              <X size={20} />
            </button>

            <div className="modal-header">
              <div className="modal-header-icon">
                <Award size={28} />
              </div>
              <h2>Interview Complete!</h2>
              <p className="modal-header-sub">Here's how you performed</p>
            </div>

            {/* Stats Row */}
            <div className="modal-stats">
              <div className="modal-stat">
                <span className="modal-stat-value">{endSummary.questionsAnswered}</span>
                <span className="modal-stat-label">Questions</span>
              </div>
              <div className="modal-stat">
                <span className="modal-stat-value">{endSummary.totalScore}</span>
                <span className="modal-stat-label">Total Score</span>
              </div>
              <div className="modal-stat">
                <span className="modal-stat-value">{endSummary.averageScore}</span>
                <span className="modal-stat-label">Avg Score</span>
              </div>
            </div>

            {/* AI Summary */}
            <div className="modal-summary">
              <h3>AI Performance Summary</h3>
              <div className="content-text">{endSummary.summary}</div>
            </div>

            {/* Actions */}
            <div className="modal-actions">
              <button className="btn-primary" onClick={() => navigate("/analytics")}>
                <BarChart3 size={16} />
                View Analytics
              </button>
              <button className="btn-secondary" onClick={() => navigate("/dashboard")}>
                <LayoutDashboard size={16} />
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Topic Input */}
      <div className="interview-setup">
        <input
          type="text"
          placeholder="Enter a topic (e.g. React, Data Structures, System Design)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && startInterview()}
        />
        <button
          className="btn-primary"
          onClick={startInterview}
          disabled={loadingStart || !topic.trim()}
          style={{ whiteSpace: "nowrap" }}
        >
          {loadingStart ? (
            <>
              <span className="spinner" />
              Starting...
            </>
          ) : (
            <>
              <Play size={16} />
              Start Interview
            </>
          )}
        </button>
      </div>

      {/* Question */}
      {question && (
        <div className="question-card">
          <div className="question-label">
            <HelpCircle size={14} />
            Question
          </div>
          <p className="question-text">{question}</p>

          <div className="answer-section">
            <textarea
              rows={6}
              placeholder="Type your answer here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />

            <div className="interview-actions">
              <button
                className="btn-primary"
                onClick={submitAnswer}
                disabled={loadingAnswer || !answer.trim()}
              >
                {loadingAnswer ? (
                  <>
                    <span className="spinner" />
                    Evaluating...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Submit Answer
                  </>
                )}
              </button>
              <button
                className="btn-danger"
                onClick={endInterview}
                disabled={loadingEnd}
              >
                {loadingEnd ? (
                  <>
                    <span className="spinner" />
                    Ending...
                  </>
                ) : (
                  <>
                    <StopCircle size={16} />
                    End Interview
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Evaluation */}
      {evaluation && (
        <div className="evaluation-card">
          <div className="evaluation-label">
            <CheckCircle2 size={14} />
            Evaluation
          </div>
          <div className="evaluation-text">{evaluation}</div>
        </div>
      )}

      {/* Progress Stats */}
      {stats && (
        <div className="section">
          <h3 style={{ marginBottom: "var(--space-md)", color: "var(--text-secondary)" }}>
            Session Progress
          </h3>
          <div className="stat-grid">
            <div className="stat-card">
              <div className="stat-icon purple">
                <Hash size={20} />
              </div>
              <div className="stat-info">
                <span className="stat-label">Questions Answered</span>
                <span className="stat-value">{stats.questionsAnswered}</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon blue">
                <TrendingUp size={20} />
              </div>
              <div className="stat-info">
                <span className="stat-label">Total Score</span>
                <span className="stat-value">{stats.totalScore}</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon green">
                <Award size={20} />
              </div>
              <div className="stat-info">
                <span className="stat-label">Average Score</span>
                <span className="stat-value">{stats.averageScore}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}