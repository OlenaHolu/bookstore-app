import React, { useState } from "react";
import { addBook } from "../api";
import Button from "./Button";

const initialBookState = {
    isbn: "",
    title: "",
    subtitle: "",
    author: "",
    published: "",
    publisher: "",
    pages: "",
    description: "",
    website: "",
    category: "",
    images: []
};

const AddBookForm = ({ onBookAdded }) => {
    const [book, setBook] = useState(initialBookState);
    const [imageUrl, setImageUrl] = useState("");

    const handleChange = (event) => {
        setBook({
            ...book,
            [event.target.name]: event.target.value
        });
    };

    const handleImageUrlChange = (event) => {
        setImageUrl(event.target.value);
    };

    const handleAddImageUrl = () => {
        if (imageUrl) {
            setBook({
                ...book,
                images: [...book.images, imageUrl]
            });
            setImageUrl("");
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addBook(book).then(() => onBookAdded());
        setBook(initialBookState);
    };

    return (
        <form className="flex flex-col space-y-4 p-4 bg-white shadow-md rounded-lg" onSubmit={handleSubmit}>
            <div className="flex items-center space-x-4">
                <label className="block text-sm font-medium text-gray-700 w-1/4">ISBN:</label>
                <input type="text" name="isbn" value={book.isbn} onChange={handleChange} required className="mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
            </div>
            <div className="flex items-center space-x-4">
                <label className="block text-sm font-medium text-gray-700 w-1/4">Título:</label>
                <input type="text" name="title" value={book.title} onChange={handleChange} required className="mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
            </div>
            <div className="flex items-center space-x-4">
                <label className="block text-sm font-medium text-gray-700 w-1/4">Subtítulo:</label>
                <input type="text" name="subtitle" value={book.subtitle} onChange={handleChange} className="mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
            </div>
            <div className="flex items-center space-x-4">
                <label className="block text-sm font-medium text-gray-700 w-1/4">Autor:</label>
                <input type="text" name="author" value={book.author} onChange={handleChange} required className="mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
            </div>
            <div className="flex items-center space-x-4">
                <label className="block text-sm font-medium text-gray-700 w-1/4">Publicado:</label>
                <input type="text" name="published" value={book.published} onChange={handleChange} required className="mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
            </div>
            <div className="flex items-center space-x-4">
                <label className="block text-sm font-medium text-gray-700 w-1/4">Editorial:</label>
                <input type="text" name="publisher" value={book.publisher} onChange={handleChange} required className="mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
            </div>
            <div className="flex items-center space-x-4">
                <label className="block text-sm font-medium text-gray-700 w-1/4">Páginas:</label>
                <input type="text" name="pages" value={book.pages} onChange={handleChange} required className="mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
            </div>
            <div className="flex items-center space-x-4">
                <label className="block text-sm font-medium text-gray-700 w-1/4">Descripción:</label>
                <input type="text" name="description" value={book.description} onChange={handleChange} required className="mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
            </div>
            <div className="flex items-center space-x-4">
                <label className="block text-sm font-medium text-gray-700 w-1/4">Sitio web:</label>
                <input type="text" name="website" value={book.website} onChange={handleChange} className="mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
            </div>
            <div className="flex items-center space-x-4">
                <label className="block text-sm font-medium text-gray-700 w-1/4">Categoría:</label>
                <input type="text" name="category" value={book.category} onChange={handleChange} className="mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
            </div>
            <div className="flex items-center space-x-4">
                <label className="block text-sm font-medium text-gray-700 w-1/4">Imágenes:</label>
                <input type="text" value={imageUrl} onChange={handleImageUrlChange} className="mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                <button type="button" onClick={handleAddImageUrl} className="ml-2 px-3 py-2 bg-indigo-500 text-white rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">Añadir URL</button>
            </div>
            <div className="flex flex-wrap space-x-2">
                {book.images.map((url, index) => (
                    <span key={index} className="text-sm text-gray-500">{url}</span>
                ))}
            </div>
            <Button text="Agregar" color="green" />
        </form>
    );
};

export default AddBookForm;