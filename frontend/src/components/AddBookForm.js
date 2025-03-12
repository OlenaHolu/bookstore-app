import React, { useState } from "react";
import { addBook } from "../api";
import Button from "./Button";
import FormInput from "./FormInput";
import ImageInput from "./ImageInput";

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
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (event) => {
        setBook({
            ...book,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await addBook(book);
            onBookAdded();
            setBook(initialBookState);
            setErrorMessage("");
        } catch (error) {
            setErrorMessage(error.response.data.error);
        }
    };

    const isFormValid = () => {
        return book.title && book.author && book.published && book.publisher && book.description && book.category;
    };

    return (
        <form className="flex flex-col space-y-2 p-4 bg-gray-50 shadow-md rounded-lg" onSubmit={handleSubmit}>
            {errorMessage && (
                <div className="text-red-500 text-sm mb-2">
                    {errorMessage}
                </div>
            )}
            <FormInput
                label="ISBN"
                name="isbn"
                value={book.isbn}
                onChange={handleChange}
                required
                pattern="\d{13}"
                inputMode="numeric"
                title="El ISBN debe contener 13 dígitos"
            />
            <FormInput
                label="Título"
                name="title"
                value={book.title}
                onChange={handleChange}
                required
            />
            <FormInput
                label="Subtítulo"
                name="subtitle"
                value={book.subtitle}
                onChange={handleChange}
            />
            <FormInput
                label="Autor"
                name="author"
                value={book.author}
                onChange={handleChange}
                required
            />
            <FormInput
                label="Publicado"
                name="published"
                type="date"
                value={book.published}
                onChange={handleChange}
                required
            />
            <FormInput
                label="Editorial"
                name="publisher"
                value={book.publisher}
                onChange={handleChange}
                required
            />
            <FormInput
                label="Páginas"
                name="pages"
                value={book.pages}
                onChange={handleChange}
                required
                pattern="\d{1,6}"
                inputMode="numeric"
                title="El número de páginas debe ser un valor numérico, max 6 digitos"
            />
            <FormInput
                label="Descripción"
                name="description"
                value={book.description}
                onChange={handleChange}
                required
            />
            <FormInput
                label="Sitio web"
                name="website"
                value={book.website}
                onChange={handleChange}
            />
            <FormInput
                label="Categoría"
                name="category"
                value={book.category}
                onChange={handleChange}
            />
            <ImageInput 
                images={book.images} 
                setImages={(images) => setBook({ ...book, images })} 
            />
            <Button 
                text="Añadir" 
                color="green" 
                disabled={!isFormValid()} 
            />
        </form>
    );
};

export default AddBookForm;