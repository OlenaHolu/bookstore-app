import axios from "axios";

const WS_URL = "http://127.0.0.1:8000/ws";

export const getAllBooks = () => axios.get(`${WS_URL}/books`);
export const getBooksPublishedBefore = (year) => axios.get(`${WS_URL}/books/published-before/${year}`);
export const getBooksByCategory = (category) => axios.get(`${WS_URL}/books/category/${category}`);
export const getBookByIsbn = (isbn) => axios.get(`${WS_URL}/books/isbn/${isbn}`);

export const addBook = (book) => axios.post(`${WS_URL}/books/add`, book);
export const importBooks = (books) => axios.post(`${WS_URL}/books/import-books`, books);

export const deleteBook = (isbn) => axios.delete(`${WS_URL}/books/${isbn}/delete`);
