import React from "react";
import { getAllBooks } from "../api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteBook } from "../api";
import Button from "./Button";

const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        loadBooks();
    }
    , []);

    const loadBooks = () => {
        getAllBooks().then((response) => setBooks(response.data));
    };

    const handleDelete = (isbn) => {
        deleteBook(isbn).then(() => loadBooks());
    };

    return (
        <div>
            <h2>Lista de Libros</h2>
            <ul>
                {books.map(book => (
                    <li key={book.isbn}>
                        <Link to={`/book/${book.isbn}`}>{book.title}</Link>
                        <Button 
                            text="Eliminar" 
                            color="red" 
                            onClick={() => handleDelete(book.isbn)} 
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
