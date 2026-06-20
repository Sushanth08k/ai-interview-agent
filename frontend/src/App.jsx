import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UploadNotes from "./pages/UploadNotes";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Interview from "./pages/Interview";
import ProtectedRoute from "./components/ProtectedRoute";
import Analytics from "./pages/Analytics";
import StudyPlan from "./pages/StudyPlan";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
              <ProtectedRoute>
                  <Dashboard />
              </ProtectedRoute>
          }
        />

        <Route
          path="/upload"
          element={
              <ProtectedRoute>
                  <UploadNotes />
              </ProtectedRoute>
          }
        />

        <Route
          path="/interview"
            element={
                <ProtectedRoute>
                    <Interview />
                </ProtectedRoute>
            }
        />

        <Route
          path="/analytics"
          element={

            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route
            path="/study-plan"
            element={
                <ProtectedRoute>
                    <StudyPlan />
                </ProtectedRoute>
            }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;