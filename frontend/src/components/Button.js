import React from "react";

const Button = ({ onClick, text, color = "blue" }) => {
    return (
        <button
            onClick={onClick}
            style={{ 
                backgroundColor: color,
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                margin: "5px"
            }}
        >
            {text}
        </button>
    );
}

export default Button;