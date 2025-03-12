import React, { useState } from "react";

const ImageInput = ({ images, setImages }) => {
    const [imageUrl, setImageUrl] = useState("");

    const handleImageUrlChange = (event) => {
        setImageUrl(event.target.value);
    };

    const handleAddImageUrl = () => {
        if (imageUrl) {
            setImages([...images, imageUrl]);
            setImageUrl("");
        }
    };

    return (
        <div>
            <div className="flex items-center space-x-2">
                <label className="block text-sm font-medium text-gray-700 w-1/4">Imágenes:</label>
                <input
                    type="text"
                    value={imageUrl}
                    onChange={handleImageUrlChange}
                    className="mt-1 block w-3/4 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <button type="button" onClick={handleAddImageUrl} className="ml-2 px-3 py-1 bg-indigo-500 text-white rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">Añadir URL</button>
            </div>
            <div className="flex flex-wrap space-x-2">
                {images.map((url, index) => (
                    <span key={index} className="text-sm text-gray-500">{url}</span>
                ))}
            </div>
        </div>
    );
};

export default ImageInput;