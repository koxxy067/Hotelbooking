import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

function RegisterPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        const { name, email, password } = form;

        if (!name || !email || !password) {
            setMessage("Please fill in all fields.");
            return;
        }

        try {
            const existing = await api.get(
                `/users?email=${encodeURIComponent(email)}`
            );

            if (existing.data.length > 0) {
                setMessage("Email already registered.");
                return;
            }

            await api.post("/users", { name, email, password });

            setMessage("Registration successful! Redirecting to login...");
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } catch (error) {
            console.error(error);
            setMessage("Error registering. Please try again.");
        }
    };

    return (
        <div className="page auth-page">
            <h2>Register</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        placeholder="Your name"
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        placeholder="you@example.com"
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        placeholder="Choose a password"
                        onChange={handleChange}
                    />
                </label>

                <button className="btn" type="submit">
                    Register
                </button>

                {message && <p className="message">{message}</p>}
            </form>

            <p>
                Already have an account? <Link to="/login">Login here</Link>.
            </p>
        </div>
    );
}

export default RegisterPage;
