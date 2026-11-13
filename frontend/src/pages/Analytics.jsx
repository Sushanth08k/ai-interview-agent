import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";
import {
  Hash,
  TrendingUp,
  Award,
  Brain,
  Loader2
} from "lucide-react";

export default function Analytics() {
  const [analysis, setAnalysis] = useState("");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const res = await api.get("/interview/analytics");
      setAnalysis(res.data.analysis);
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
      <Layout title="Analytics" subtitle="Your interview performance at a glance.">
        <div className="page-loader">
          <div className="spinner" />
          Loading analytics...
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Analytics" subtitle="Your interview performance at a glance.">
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

      {/* Analysis Content */}
      {analysis && (
        <div className="content-card section">
          <div className="content-card-header">
            <Brain size={18} color="var(--accent)" />
            <h3>AI Performance Analysis</h3>
          </div>
          <div className="content-text">{analysis}</div>
        </div>
      )}
    </Layout>
  );
}