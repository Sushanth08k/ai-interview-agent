import { useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";
import {
  Send,
  Bot,
  User,
  Sparkles,
  Loader2
} from "lucide-react";

export default function AskAI() {
  const [question, setQuestion] = useState("");
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!question.trim() || loading) return;

    const userQuestion = question;
    setQuestion("");
    setConversations((prev) => [...prev, { role: "user", content: userQuestion }]);
    setLoading(true);

    try {
      const res = await api.post("/ask/", { question: userQuestion });
      setConversations((prev) => [...prev, { role: "ai", content: res.data.answer }]);
    } catch (error) {
      console.log(error);
      setConversations((prev) => [
        ...prev,
        { role: "ai", content: "Sorry, I couldn't find an answer. Make sure you've uploaded relevant notes first." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Ask AI" subtitle="Ask questions and get answers from your uploaded notes using RAG.">
      {/* Conversation Area */}
      <div className="chat-container">
        {conversations.length === 0 && !loading && (
          <div className="chat-empty">
            <div className="chat-empty-icon">
              <Sparkles size={32} />
            </div>
            <h3>Ask anything from your notes</h3>
            <p>
              Upload your study materials first, then ask questions here.
              The AI will answer using only your uploaded content.
            </p>
          </div>
        )}

        {conversations.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.role}`}>
            <div className={`chat-avatar ${msg.role}`}>
              {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={`chat-bubble ${msg.role}`}>
              <div className="chat-bubble-label">
                {msg.role === "user" ? "You" : "AI Coach"}
              </div>
              <div className="chat-bubble-content">{msg.content}</div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="chat-message ai">
            <div className="chat-avatar ai">
              <Bot size={16} />
            </div>
            <div className="chat-bubble ai">
              <div className="chat-bubble-label">AI Coach</div>
              <div className="chat-typing">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <form className="chat-input-area" onSubmit={handleAsk}>
        <input
          type="text"
          placeholder="Ask a question about your notes..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          className="btn-primary"
          disabled={loading || !question.trim()}
        >
          <Send size={16} />
        </button>
      </form>
    </Layout>
  );
}
