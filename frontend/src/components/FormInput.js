import React from "react";

const FormInput = ({ label, name, type = "text", value, onChange, required = false, pattern, inputMode, title }) => {
    return (
        <div className="flex items-center space-x-2">
            <label className="block text-sm font-medium text-gray-700 w-1/4">{label}:</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                pattern={pattern}
                inputMode={inputMode}
                title={title}
                className="mt-1 block w-3/4 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
        </div>
    );
};

export default FormInput;