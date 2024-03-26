// src/components/FormSelect.js
const FormSelect = ({ className, name, options, onChange }) => {
  return (
    <select name={name} className={className} onChange={onChange}>
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
};


export default FormSelect;
