import React from "react";

const Layout = ({ children }) => (
    <div className="min-h-screen flex flex-col">
        <header className="bg-blue-600 text-white p-4 shadow-md">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold">Libreria</h1>
            </div>
        </header>
        <main className="flex-grow container mx-auto p-4">
            {children}
        </main>
        <footer className="bg-gray-800 text-white p-4">
            <div className="container mx-auto text-center">
                <p>&copy; 2025 Libreria. Todos los derechos reservados.</p>
            </div>
        </footer>
    </div>
);

export default Layout;