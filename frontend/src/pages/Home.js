import React, { useState } from "react";
import BookList from "../components/BookList";
import AddBookForm from "../components/AddBookForm";
import Layout from "../components/Layout";

const Home = () => {
    const [refresh, setRefresh] = useState(false);

    return (
        <Layout>
            <main className="flex-grow container mx-auto p-4">
                <div className="flex flex-wrap -mx-4">
                    <div className="lg:w-1/4 bg-white p-4 shadow-md rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Añadir Libro</h2>
                        <AddBookForm onBookAdded={() => setRefresh(!refresh)} />
                    </div>
                    <div className="lg:w-3/4 bg-white p-4 shadow-md rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Lista de Libros</h2>
                        <BookList key={refresh} />
                    </div>
                </div>
            </main>
        </Layout>
    );
}

export default Home;






