import axios from "axios";

const WS_URL = "http://127.0.0.1:8000/ws";

const api = axios.create({
    baseURL: WS_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn("Token expirado o invalido. Cerrando sesión...");
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);


export const getAllBooks = () => api.get("/books");
export const getBooksPublishedBefore = (year) => api.get(`/books/published-before/${year}`);
export const getBooksByCategory = (category) => api.get(`/books/category/${category}`);
export const getBookByIsbn = (isbn) => api.get(`/books/isbn/${isbn}`);
export const addBook = (book) => api.post("/books/add", book);
export const importBooks = (books) => api.post("/books/import-books", books);
export const deleteBook = (isbn) => api.delete(`/books/${isbn}/delete`);

export const register = (email, password) => api.post("/register", { email, password });
export const login = (email, password) => api.post("/login", { email, password });
export const getUserInfo = () => api.get("/me");
export const logout = () => localStorage.removeItem("token");
