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
    }, []);

    const loadBooks = () => {
        getAllBooks().then((response) => setBooks(response.data));
    };

    const handleDelete = (isbn) => {
        deleteBook(isbn).then(() => loadBooks());
    };

    return (
        <div className="bg-white p-2 shadow-md rounded-lg">
            <ul className="space-y-2">
                {books.map(book => (
                    <li key={book.isbn} className="flex items-center justify-between p-1 bg-gray-100 rounded-md shadow-sm">
                        <Link to={`/book/${book.isbn}`} className="text-lg font-medium text-indigo-600 hover:underline">
                            {book.title}
                        </Link>
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
