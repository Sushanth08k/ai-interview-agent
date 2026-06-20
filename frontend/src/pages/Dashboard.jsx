import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem(
            "token"
        );

        navigate("/");
    };

    return (

        <div>

            <h1>
                AI Interview Coach
            </h1>

            <br />

            <Link to="/upload">
                Upload Notes
            </Link>

            <br />
            <br />

            <Link to="/interview">
                Mock Interview
            </Link>

            <br />
            <br />

            <Link to="/analytics">
                Analytics
            </Link>

            <br />
            <br />

            <Link to="/study-plan">
                Study Plan
            </Link>

            <br />
            <br />

            <button
                onClick={handleLogout}
            >
                Logout
            </button>

        </div>

    );
}