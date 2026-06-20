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

      </Routes>

    </BrowserRouter>

  );

}

export default App;