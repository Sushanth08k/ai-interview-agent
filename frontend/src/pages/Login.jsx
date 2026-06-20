import { useState }
from "react";

import api
from "../services/api";

import { useNavigate }
from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin =
    async () => {

      try {

        const res =
          await api.post(
            "/auth/login",
            {
              email,
              password
            }
          );

        localStorage.setItem(
          "token",
          res.data.access_token
        );

        navigate(
          "/dashboard"
        );

      } catch {

        alert(
          "Login Failed"
        );
      }
    };

  return (
    <div>


      <h1>
        AI Interview Coach
      </h1>

      <input
        placeholder="Email"
        onChange={(e)=>
          setEmail(
            e.target.value
          )
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e)=>
          setPassword(
            e.target.value
          )
        }
      />

      <button
        onClick={handleLogin}
      >
        Login
      </button>
      <p>
        Don't have an account?
        {" "}
        <Link to="/register">
            Register
        </Link>
    </p>
      
    </div>
  );
}