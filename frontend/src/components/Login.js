import React, { useState } from "react";
import { login } from "../api";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await login(email, password);
            const token = response.data.token;
            localStorage.setItem("token", token);
            onLogin && onLogin();
            navigate("/");
        } catch (error) {
            setError("Credentials are incorrect or there was a server error");
        }
    };

    return (
        <div className="bg-white p-6 shadow-md rounded-lg max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">🔑 Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border p-2 rounded w-full mb-2"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border p-2 rounded w-full mb-4"
                />
                <Button 
                    type="submit"
                    text="Iniciar Sesión"
                />
            </form>
            {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        </div>
    );
}

export default Login;