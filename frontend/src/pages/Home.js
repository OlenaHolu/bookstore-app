import React, { useState } from "react";
import BookList from "../components/BookList";
import AddBookForm from "../components/AddBookForm";

const Home = () => {
    const [refresh, setRefresh] = useState(false);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Libreria</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 shadow-md rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">Agregar Libro</h2>
                    <AddBookForm onBookAdded={() => setRefresh(!refresh)} />
                </div>
                <div className="bg-white p-4 shadow-md rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">Lista de Libros</h2>
                    <BookList key={refresh} />
                </div>
            </div>
        </div>
    );
}

export default Home;






