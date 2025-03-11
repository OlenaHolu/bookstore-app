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
        <div>
            <h2>Detalles del Libro</h2>
            <p>ISBN: {bookData.isbn}</p>
            <p>Título: {bookData.title}</p>
            <p>Autor: {bookData.author}</p>
            <p>Editorial: {bookData.publisher}</p>
            <p>Páginas: {bookData.pages}</p>
            <p>Descripción: {bookData.description}</p>
            <p>Sitio web: <a href={bookData.website}>{bookData.website}</a></p>
            <p>Categoría: {bookData.category}</p>
            {bookData.images && bookData.images.length > 0 && (
                <div>
                    <h3>Imágenes</h3>
                    {bookData.images.map((image) => (
                        <img key={image.id} src={image.url} alt={`Imagen del libro ${bookData.title}`} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BookDetails;