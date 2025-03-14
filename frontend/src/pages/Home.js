import React, { useState, useEffect } from "react";
import BookList from "../components/BookList";
import AddBookForm from "../components/AddBookForm";
import ImportBooks from "../components/ImportBooks";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const Home = () => {
    const [refresh, setRefresh] = useState(false);

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    }, []);

    return (
        <Layout>
            <main className="flex-grow container mx-auto p-4">
                {isAuthenticated ? (
                    <div className="flex flex-wrap -mx-4">
                        <div className="lg:w-1/4 bg-white p-4 shadow-md rounded-lg">
                            <h2 className="text-2xl font-bold mb-4">Añadir Libro</h2>
                            <AddBookForm onBookAdded={() => setRefresh(!refresh)} />
                            <h2 className="text-2xl font-bold mt-8 mb-4">Importar libros</h2>
                            <ImportBooks onImport={() => setRefresh(!refresh)} />
                        </div>
                        <div className="lg:w-3/4 bg-white p-4 shadow-md rounded-lg">
                            <h2 className="text-2xl font-bold mb-4">📚 Lista de Libros</h2>
                            <BookList key={refresh} />
                        </div>
                    </div>
                ) : (
                    <div className="text-center bg-white p-6 shadow-md rounded-lg max-w-md mx-auto mt-10">
                        <h2 className="text-3xl font-bold mb-4">¡Bienvenido a la Librería! 📖</h2>
                        <p className="mb-4 text-gray-700">
                            Para acceder a nuestra colección de libros, por favor inicia sesión o regístrate.
                        </p>
                        <Link to="/login">
                            <Button text = "🔑 Iniciar Sesión" />
                        </Link>
                        <p className="mt-4">
                            ¿No tienes cuenta?{" "}
                            <Link to="/register" className="text-blue-500">
                                Regístrate aquí
                            </Link>
                        </p>
                    </div>
                )}
            </main>
        </Layout>

    );
}

export default Home;