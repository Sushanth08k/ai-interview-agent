import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";
import {
  Target,
  HelpCircle,
  AlertTriangle,
  Loader2
} from "lucide-react";

export default function Practice() {
  const [practice, setPractice] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPractice();
  }, []);

  const fetchPractice = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/interview/practice");
      if (res.data.message) {
        setError(res.data.message);
      } else {
        setPractice(res.data.practice);
      }
    } catch (err) {
      console.log(err);
      setError("Failed to load practice questions. Complete an interview first.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout title="Practice Questions" subtitle="Targeted questions for your weakest areas.">
        <div className="page-loader">
          <div className="spinner" />
          Generating practice questions...
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Practice Questions" subtitle="Targeted questions for your weakest areas.">
      {error ? (
        <div className="empty-state">
          <div className="empty-state-icon amber">
            <AlertTriangle size={28} />
          </div>
          <h3>{error}</h3>
          <p>Complete a mock interview first to get personalized practice questions.</p>
        </div>
      ) : (
        <div className="content-card">
          <div className="content-card-header">
            <Target size={18} color="var(--accent)" />
            <h3>AI-Generated Practice Questions</h3>
          </div>
          <div className="content-text">{practice}</div>
        </div>
      )}
    </Layout>
  );
}
