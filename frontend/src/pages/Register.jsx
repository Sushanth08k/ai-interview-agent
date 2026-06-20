import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [targetRole, setTargetRole] = useState("");

    const handleRegister = async () => {

        try {

            const response = await api.post(
                "/auth/register",
                {
                    name,
                    email,
                    password,
                    target_role: targetRole
                }
            );

            alert(
                response.data.message ||
                "Registration Successful"
            );

            navigate("/");

        } catch (error) {

            console.log(error.response?.data);

            alert(
                JSON.stringify(
                    error.response?.data
                )
            );

        }

    };

    return (

        <div>

            <h1>
                Register
            </h1>

            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) =>
                    setName(e.target.value)
                }
            />

            <br />
            <br />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
            />

            <br />
            <br />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
            />

            <br />
            <br />
            
            <input
                type="text"
                placeholder="Target Role"
                value={targetRole}
                onChange={(e) =>
                    setTargetRole(
                        e.target.value
                    )
                }
            />

            <br />
            <br />

            <button
                onClick={handleRegister}
            >
                Register
            </button>

            <br />
            <br />

            <p>
                Already have an account?
                {" "}
                <Link to="/">
                    Login
                </Link>
            </p>

        </div>

    );
}