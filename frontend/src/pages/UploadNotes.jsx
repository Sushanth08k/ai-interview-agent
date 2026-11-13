import { useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";
import {
  CloudUpload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2
} from "lucide-react";

export default function UploadNotes() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setMessage("");
      setMessageType("");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped && dropped.type === "application/pdf") {
      setFile(dropped);
      setMessage("");
      setMessageType("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a PDF file first.");
      setMessageType("error");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setMessage("");
      const res = await api.post("/notes/upload", formData);
      const isAlreadyUploaded = res.data.message === "File already uploaded";
      setMessage(res.data.message || "File uploaded successfully!");
      setMessageType(isAlreadyUploaded ? "warning" : "success");
      if (!isAlreadyUploaded) {
        setFile(null);
      }
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.detail || "Upload failed. Please try again.";
      setMessage(errorMsg);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Upload Notes" subtitle="Upload your study materials to build your knowledge base.">
      <div
        className={`upload-zone ${dragOver ? "drag-over" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <div className="upload-zone-icon">
          <CloudUpload size={28} />
        </div>
        <div>
          <p style={{ color: "var(--text-primary)", fontWeight: 500 }}>
            Drag & drop your PDF here
          </p>
          <p style={{ fontSize: "0.813rem", marginTop: "4px" }}>
            or click to browse files
          </p>
        </div>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          aria-label="Select PDF file"
        />
      </div>

      {file && (
        <div className="upload-file-info" style={{ marginTop: "var(--space-md)" }}>
          <FileText size={16} />
          {file.name}
        </div>
      )}

      <div style={{ marginTop: "var(--space-lg)", display: "flex", gap: "var(--space-md)", alignItems: "center", flexWrap: "wrap" }}>
        <button
          className="btn-primary"
          onClick={handleUpload}
          disabled={loading || !file}
        >
          {loading ? (
            <>
              <span className="spinner" />
              Uploading...
            </>
          ) : (
            <>
              <CloudUpload size={16} />
              Upload PDF
            </>
          )}
        </button>

        {message && (
          <div className={`upload-message ${messageType}`}>
            {messageType === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            {message}
          </div>
        )}
      </div>
    </Layout>
  );
}