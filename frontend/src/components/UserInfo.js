import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../api";

const UserInfo = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getUserInfo().then((response) => setUser(response.data));
    }, [navigate]);

    return (
        <div className="bg-white p-6 shadow-md rounded-lg max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">👤 Perfil del Usuario</h2>
            {user ? (
                <div>
                    <p className="text-gray-700 mb-4">Correo: <strong>{user.email}</strong></p>
                </div>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
};

export default UserInfo;
