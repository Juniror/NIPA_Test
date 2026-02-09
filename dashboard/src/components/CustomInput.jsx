import React from 'react';

function CustomInput({ type = 'text', value, onChange, placeholder, required = false, className = '' }) {
    const style = {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        boxSizing: 'border-box'
    };

    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={`custom-input ${className}`}
            style={style}
        />
    );
}

export default CustomInput;
