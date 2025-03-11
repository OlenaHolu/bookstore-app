import React, { useState } from "react";
import BookList from "../components/BookList";
import AddBookForm from "../components/AddBookForm";

const Home = () => {
    const [refresh, setRefresh] = useState(false);

    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-blue-600 text-white p-4 shadow-md">
                <div className="container mx-auto">
                    <h1 className="text-3xl font-bold">Libreria</h1>
                </div>
            </header>
            <main className="flex-grow container mx-auto p-4">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/4 bg-white p-4 shadow-md rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Agregar Libro</h2>
                        <AddBookForm onBookAdded={() => setRefresh(!refresh)} />
                    </div>
                    <div className="md:w-3/4 bg-white p-4 shadow-md rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Lista de Libros</h2>
                        <BookList key={refresh} />
                    </div>
                </div>
            </main>
            <footer className="bg-gray-800 text-white p-4">
                <div className="container mx-auto text-center">
                    <p>&copy; 2025 Libreria. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
}

export default Home;






