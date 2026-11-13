import Dashboard from "./pages/Dashboard";
import UploadNotes from "./pages/UploadNotes";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Interview from "./pages/Interview";
import Analytics from "./pages/Analytics";
import StudyPlan from "./pages/StudyPlan";
import AskAI from "./pages/AskAI";
import Practice from "./pages/Practice";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/register" element={<Navigate to="/" replace />} />
        <Route path="/upload" element={<UploadNotes />} />
        <Route path="/ask" element={<AskAI />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/study-plan" element={<StudyPlan />} />
        <Route path="/practice" element={<Practice />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;