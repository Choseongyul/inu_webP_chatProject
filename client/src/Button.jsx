import React from 'react';

const Button = ({ text, onClick, type = 'button', className, disabled = false }) => {
    return (
        <button type={type} className={className} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    );
};

export default Button;
