import React, { useState } from "react";
import BookList from "../components/BookList";
import AddBookForm from "../components/AddBookForm";

const Home = () => {
    const [refresh, setRefresh] = useState(false);

    return (
        <div>
            <h1>Libreria</h1>
            <AddBookForm onBookAdded={() => setRefresh(!refresh)} />
            <BookList key={refresh} />
        </div>
    );
}

export default Home;






