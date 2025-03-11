import React, { useState } from "react";
import { addBook } from "../api";

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

    const handleChange = (event) => {
        setBook({
            ...book,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addBook(book).then(() => onBookAdded());
        setBook(initialBookState);
    };

    const handleFileChange = (event) => {
        const files = event.target.files;
        const images = [];
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onloadend = () => {
                images.push(reader.result);
                if (images.length === files.length) {
                    setBook({
                        ...book,
                        images: images
                    });
                }
            };
            reader.readAsDataURL(files[i]);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Agregar Libro</h2>
            <label>ISBN:</label>
            <input type="text" name="isbn" value={book.isbn} onChange={handleChange} required/>
            <label>Título:</label>
            <input type="text" name="title" value={book.title} onChange={handleChange} required/>
            <label>Subtítulo:</label>
            <input type="text" name="subtitle" value={book.subtitle} onChange={handleChange} />
            <label>Autor:</label>
            <input type="text" name="author" value={book.author} onChange={handleChange} required/>
            <label>Publicado:</label>
            <input type="text" name="published" value={book.published} onChange={handleChange} required/>
            <label>Editorial:</label>
            <input type="text" name="publisher" value={book.publisher} onChange={handleChange} required/>
            <label>Páginas:</label>
            <input type="text" name="pages" value={book.pages} onChange={handleChange} required/>
            <label>Descripción:</label>
            <input type="text" name="description" value={book.description} onChange={handleChange} required/>
            <label>Sitio web:</label>
            <input type="text" name="website" value={book.website} onChange={handleChange} />
            <label>Categoría:</label>
            <input type="text" name="category" value={book.category} onChange={handleChange} />
            <label>Imágenes:</label>
            <input type="file" name="images" onChange={handleFileChange} multiple />
            <button type="submit">Agregar</button>
        </form> 
    );
};

export default AddBookForm;