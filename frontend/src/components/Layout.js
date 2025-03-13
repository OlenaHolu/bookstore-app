import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"

const Layout = ({ children }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/login");
    }

    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
                <h1 className="text-3xl font-bold">Libreria</h1>
                <button
                    className="text-white text-3xl md:hidden"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <FiX /> : <FiMenu />}
                </button>
                <nav className={`${menuOpen ? "block" : "hidden"} md:flex`}>
                    {isAuthenticated ? (
                        <>
                            <Link to="/profile" className="py-2 px-4">👤 Perfil</Link>
                            <button onClick={handleLogout} className="py-2 px-4 text-red-500">
                                🚪 Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="py-2 px-4">🔑 Login</Link>
                            <Link to="/register" className="py-2 px-4">📝 Registro</Link>
                        </>
                    )}
                </nav>
            </header>
            <main className="flex-grow container mx-auto p-4">
                {React.cloneElement(children, { onLogin: handleLogin })}
            </main>
            <footer className="bg-gray-800 text-white p-4">
                <div className="container mx-auto text-center">
                    <p>&copy; 2025 Libreria. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;