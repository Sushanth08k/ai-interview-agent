import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";
import {
  Hash,
  TrendingUp,
  Award,
  BookOpen,
  Loader2
} from "lucide-react";

export default function StudyPlan() {
  const [plan, setPlan] = useState("");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlan();
  }, []);

  const fetchPlan = async () => {
    try {
      setLoading(true);
      const res = await api.get("/interview/study-plan");
      setPlan(res.data.study_plan);
      setStats({
        questionsAnswered: res.data.questions_answered,
        totalScore: res.data.total_score,
        averageScore: res.data.average_score,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout title="Study Plan" subtitle="Your personalized learning roadmap.">
        <div className="page-loader">
          <div className="spinner" />
          Loading study plan...
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Study Plan" subtitle="Your personalized learning roadmap.">
      {/* Stat Cards */}
      {stats && (
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
      )}

      {/* Study Plan Content */}
      {plan && (
        <div className="content-card section">
          <div className="content-card-header">
            <BookOpen size={18} color="var(--accent)" />
            <h3>Personalized Study Plan</h3>
          </div>
          <div className="content-text">{plan}</div>
        </div>
      )}
    </Layout>
  );
}