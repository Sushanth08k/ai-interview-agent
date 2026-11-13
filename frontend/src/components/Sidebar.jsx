import { Link } from "react-router-dom";

export default function Sidebar() {

    return (

        <div className="sidebar">

            <Link to="/dashboard">
                Dashboard
            </Link>

            <Link to="/upload">
                Upload Notes
            </Link>

            <Link to="/interview">
                Interview
            </Link>

            <Link to="/analytics">
                Analytics
            </Link>

            <Link to="/study-plan">
                Study Plan
            </Link>

        </div>

    );
}