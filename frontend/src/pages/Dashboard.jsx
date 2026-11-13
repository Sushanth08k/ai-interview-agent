import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../services/api";
import {
  Upload,
  MessageSquare,
  BarChart3,
  BookOpen,
  ArrowRight,
  BotMessageSquare,
  Target,
  Lightbulb,
  Play
} from "lucide-react";

const cards = [
  {
    title: "Upload Notes",
    description: "Upload your PDFs and study materials to build your personal knowledge base for AI-powered interviews.",
    path: "/upload",
    icon: Upload,
    color: "purple",
  },
  {
    title: "Ask AI",
    description: "Ask questions about your uploaded notes and get instant AI-powered answers using RAG.",
    path: "/ask",
    icon: BotMessageSquare,
    color: "blue",
  },
  {
    title: "Mock Interview",
    description: "Practice with AI-generated questions tailored to your topic. Get real-time evaluation and feedback.",
    path: "/interview",
    icon: MessageSquare,
    color: "green",
  },
  {
    title: "Analytics",
    description: "View your interview performance metrics, strengths, and areas for improvement at a glance.",
    path: "/analytics",
    icon: BarChart3,
    color: "amber",
  },
  {
    title: "Study Plan",
    description: "Get a personalized learning plan based on your interview performance and weak areas.",
    path: "/study-plan",
    icon: BookOpen,
    color: "purple",
  },
  {
    title: "Practice Questions",
    description: "Get targeted practice questions for your weakest topics based on your interview history.",
    path: "/practice",
    icon: Target,
    color: "blue",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    api.get("/interview/recommendation")
      .then((res) => {
        if (res.data.recommendation && !res.data.message) {
          setRecommendation(res.data.recommendation);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <Layout title="Dashboard" subtitle="Welcome back! Choose where to continue.">

      {/* AI Recommendation Banner */}
      {recommendation && (
        <div className="recommendation-banner">
          <div className="recommendation-icon">
            <Lightbulb size={22} />
          </div>
          <div className="recommendation-content">
            <div className="recommendation-label">AI Recommendation</div>
            <div className="recommendation-text">{recommendation}</div>
          </div>
          <button
            className="btn-primary"
            onClick={() => navigate("/interview")}
            style={{ whiteSpace: "nowrap", flexShrink: 0 }}
          >
            <Play size={14} />
            Start Interview
          </button>
        </div>
      )}

      {/* Feature Cards */}
      <div className="dashboard-grid">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.path}
              className="dashboard-card"
              onClick={() => navigate(card.path)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && navigate(card.path)}
            >
              <div className={`dashboard-card-icon ${card.color}`}>
                <Icon size={24} />
              </div>
              <div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
              <div className="dashboard-card-arrow">
                <ArrowRight size={18} />
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}