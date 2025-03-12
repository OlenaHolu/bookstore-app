import React from "react";

const Button = ({ onClick, text, color = "blue", disabled = false }) => {
    return (
        <button
            onClick={onClick}
            style={{ 
                backgroundColor: disabled ? "gray" : color,
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: disabled ? "not-allowed" : "pointer",
                margin: "5px"
            }}
            disabled={disabled}
        >
            {text}
        </button>
    );
}

export default Button;