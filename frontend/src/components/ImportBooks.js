import React, { useState } from "react";
import Button from "./Button";
import { importBooks } from "../api";

const ImportBooks = ({ onImport }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setErrorMessage("");
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setErrorMessage("Por favor selecciona un archivo JSON");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            await importBooks(formData);
            alert("Libros importados correctamente");
            setSelectedFile(null);
            setErrorMessage("");
            onImport();
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.error);
            }else {
                setErrorMessage("Error de conexión al servidor");
            }
        }
    };

    return (
        <div className="flex flex-col space-y-2 p-4 bg-gray-50 shadow-md rounded-lg border border-solid border-gray-400">
            <input 
                type="file" 
                accept=".json"
                onChange={handleFileChange}
                className="border p-2 rounded w-full mb-2" 
            />

            {selectedFile && (
                <Button
                     onClick={handleUpload} 
                     text="Subir archivo JSON"
                />
            )}

            {errorMessage && (
                <div className="text-red-500 text-sm mt-2">
                    {errorMessage}
                </div>
            )}
        </div>
    );
};

export default ImportBooks;