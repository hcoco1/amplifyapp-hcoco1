// src/components/FormInput.js
import React from 'react';

function FormInput({ name, placeholder, value, onChange, className }) {
  return (
    <input
    className={className}
      type="text"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
    />
  );
}

export default FormInput;
