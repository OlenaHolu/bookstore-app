import React, { useState, useEffect } from "react";
import { getAllBooks, deleteBook, getBooksPublishedBefore, getBooksByCategory, getBookByIsbn } from "../api";
import Button from "./Button";
import BookItem from "./BookItem";

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [searchType, setSearchType] = useState("year");
    const [searchValue, setSearchValue] = useState("");
    const [isFilterApplied, setIsFilterApplied] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = () => {
        getAllBooks()
            .then((response) => {
                setBooks(response.data);
                setErrorMessage("");
            })
            .catch(() => {
                setBooks([]);
                setErrorMessage("No se encontraron resultados.");
            });
    };

    const handleDelete = (isbn) => {
        deleteBook(isbn)
            .then(() => loadBooks())
            .catch(() => {
                setErrorMessage("Libro no encontrado.");
            });
    };

    const handleSearch = async () => {
        if (!searchValue.trim()) {
            setErrorMessage("El campo de búsqueda está vacío");
            return;
        }
        let response;
        try {
            switch (searchType) {
                case "year":
                    response = await getBooksPublishedBefore(searchValue);
                    break;
                case "category":
                    response = await getBooksByCategory(searchValue);
                    break;
                case "isbn":
                    response = await getBookByIsbn(searchValue);
                    break;
                default:
                    return;
            }
            if (response.data.length === 0) {
                setBooks([]);
                setErrorMessage(`No se encontraron resultados para ${searchType}: ${searchValue}.`);
            } else {
                setBooks(response.data);
                setErrorMessage("");
            }
            setIsFilterApplied(true);
        } catch {
            setBooks([]);
            setErrorMessage(`No se encontraron resultados para ${searchType}: ${searchValue}.`);
            setIsFilterApplied(true);
        }
    };

    const clearFilter = () => {
        setSearchValue("");
        loadBooks();
        setIsFilterApplied(false);
        setErrorMessage("");
    };

    return (
        <div className="bg-white p-2 shadow-md rounded-lg">
            <div className="mb-4">
                <select
                    value={searchType}
                    onChange={(e) => {
                        setSearchType(e.target.value);
                        setSearchValue("");
                        clearFilter();
                    }} 
                    className="border p-2 rounded"
                >
                    <option value="year">Buscar antes del Año</option>
                    <option value="category">Buscar por Categoría</option>
                    <option value="isbn">Buscar por ISBN</option>
                </select>
                <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="border p-2 rounded ml-2"
                    placeholder="Ingrese valor de búsqueda"
                />
                <Button 
                    text="Buscar" 
                    color="blue" 
                    onClick={handleSearch}
                />
            </div>
            {isFilterApplied && (
                <div className="mb-4 flex items-center">
                     <Button 
                        text="Eliminar filtro" 
                        color="red" 
                        onClick={clearFilter}
                    />
                </div>
            )}
            {errorMessage && (
                <div className="mb-4 text-red-500">
                    {errorMessage}
                </div>
            )}
            <ul className="space-y-2">
                {books.map(book => (
                    <BookItem key={book.isbn} book={book} onDelete={handleDelete} />
                ))}
            </ul>
        </div>
    );
};

export default BookList;
