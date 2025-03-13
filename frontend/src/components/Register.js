import React, { useState } from "react";
import { register } from "../api";
import Button from "./Button";

const Register = ({ onRegister }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        try {
            await register(email, password);
            setSuccess("Registro exitoso. Ahora puedes iniciar sesión.");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            onRegister && onRegister();
        } catch (error){
            setError("Error al registrar. Verifica la email y la contraseña.");
        }
    };

    return (
        <div className="bg-white p-6 shadow-md rounded-lg max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">📝 Registro</h2>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
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
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border p-2 rounded w-full mb-2"
                />
                <input
                    type="password"
                    placeholder="Confirmar contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="border p-2 rounded w-full mb-2"
                />
                <Button 
                    type="submit"
                    text="Registrarse"
                />
            </form>
        </div>
    );
};

export default Register;