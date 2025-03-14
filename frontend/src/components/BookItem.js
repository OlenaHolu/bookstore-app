import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

const BookItem = ({ book, onDelete }) => (
    <li key={book.isbn} className="flex items-center justify-between p-1 bg-gray-100 rounded-md shadow-sm">
        <div className="flex items-center space-x-4">
            <div>
                <Link to={`/book/${book.isbn}`} className="text-lg font-medium text-indigo-600 hover:underline">
                    {book.title}
                </Link>
                <p className="text-sm text-gray-600">ISBN: {book.isbn}</p>
                <p className="text-sm text-gray-600">Publicado: {book.published}</p>
                <p className="text-sm text-gray-600">Categoría: {book.category}</p>
            </div>
            {book.images && book.images.length > 0 && (
                <img src={book.images[0].url} alt={`Imagen de ${book.title}`} className="w-12 h-12 object-cover rounded-md shadow-sm"/>
            )}
        </div>
        <Button 
            text="Eliminar" 
            color="rgb(248, 59, 59)" 
            onClick={() => onDelete(book.isbn)} 
        />
    </li>
);

export default BookItem;