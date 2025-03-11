import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookByIsbn } from "../api";

const BookDetails = () => {
    const { isbn } = useParams(); 
    const [bookData, setBookData] = useState({}); 

    useEffect(() => {
        getBookByIsbn(isbn).then((response) => setBookData(response.data));
    }, [isbn]); 

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Detalles del Libro</h2>
            <div className="space-y-2">
                <p><span className="font-semibold">ISBN:</span> {bookData.isbn}</p>
                <p><span className="font-semibold">Título:</span> {bookData.title}</p>
                <p><span className="font-semibold">Autor:</span> {bookData.author}</p>
                <p><span className="font-semibold">Editorial:</span> {bookData.publisher}</p>
                <p><span className="font-semibold">Páginas:</span> {bookData.pages}</p>
                <p><span className="font-semibold">Descripción:</span> {bookData.description}</p>
                <p><span className="font-semibold">Sitio web:</span> <a href={bookData.website} className="text-indigo-600 hover:underline">{bookData.website}</a></p>
                <p><span className="font-semibold">Categoría:</span> {bookData.category}</p>
            </div>
            {bookData.images && bookData.images.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">Imágenes</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {bookData.images.map((image) => (
                            <img key={image.id} src={image.url} alt={`Imagen del libro ${bookData.title}`} className="w-full h-auto rounded-md shadow-sm"/>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookDetails;