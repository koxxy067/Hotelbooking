import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { useAuth } from "../contexts/AuthContext.jsx";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!email || !password) {
            setMessage("Please enter email and password.");
            return;
        }

        try {
            const res = await api.get(
                `/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(
                    password
                )}`
            );

            if (res.data.length === 0) {
                setMessage("Invalid email or password.");
            } else {
                login(res.data[0]);
                navigate("/");
            }
        } catch (error) {
            console.error(error);
            setMessage("Error logging in. Please try again.");
        }
    };

    return (
        <div className="page auth-page">
            <h2>Login</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        placeholder="test@example.com"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>

                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        placeholder="123456"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>

                <button className="btn" type="submit">
                    Login
                </button>

                {message && <p className="message">{message}</p>}
            </form>

            <p>
                Don&apos;t have an account? <Link to="/register">Register here</Link>.
            </p>
        </div>
    );
}

export default LoginPage;
