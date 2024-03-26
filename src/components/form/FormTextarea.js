// src/components/FormTextarea.js
import React from 'react';

function FormTextarea({ name, placeholder, value, onChange, rows, className }) {
  return (
    <textarea
    className={className}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      rows={rows}
    ></textarea>
  );
}

export default FormTextarea;
