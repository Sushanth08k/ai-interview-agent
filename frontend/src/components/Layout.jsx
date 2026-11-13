import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  MessageSquare,
  BarChart3,
  BookOpen,
  Sparkles,
  Menu,
  X,
  BotMessageSquare,
  Target,
  User
} from "lucide-react";
import { useState, useEffect } from "react";
import api from "../services/api";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/upload", label: "Upload Notes", icon: Upload },
  { path: "/ask", label: "Ask AI", icon: BotMessageSquare },
  { path: "/interview", label: "Interview", icon: MessageSquare },
  { path: "/analytics", label: "Analytics", icon: BarChart3 },
  { path: "/study-plan", label: "Study Plan", icon: BookOpen },
  { path: "/practice", label: "Practice", icon: Target },
];

export default function Layout({ children, title, subtitle }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get("/auth/me")
      .then((res) => setUser(res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="app-layout">
      {/* Mobile Navbar */}
      <div className="navbar">
        <div className="navbar-brand">
          <Sparkles size={20} color="var(--accent)" />
          <span>AI Interview Coach</span>
        </div>
        <button
          className="btn-icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar Overlay (mobile) */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "visible" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">
            <Sparkles size={18} color="white" />
          </div>
          <span className="sidebar-brand-text">AI Interview Coach</span>
        </div>

        {/* User Profile */}
        {user && (
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">
              <User size={16} />
            </div>
            <div className="sidebar-user-info">
              <span className="sidebar-user-name">{user.email?.split("@")[0] || "User"}</span>
              {user.target_role && (
                <span className="sidebar-user-role">{user.target_role}</span>
              )}
            </div>
          </div>
        )}

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-link ${isActive ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {title && (
          <div className="page-header">
            <h1 className="page-title">{title}</h1>
            {subtitle && <p className="page-subtitle">{subtitle}</p>}
          </div>
        )}
        {children}
      </main>
    </div>
  );
}