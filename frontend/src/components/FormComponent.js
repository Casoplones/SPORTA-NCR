import React, { useState } from 'react';

function FormComponent({ fields, onSubmit, buttonText }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    const field = fields.find((f) => f.name === name);
    if (field.required && !value && field.type !== 'file') {
      return 'Este campo es obligatorio';
    }
    if (field.type === 'number' && isNaN(value)) {
      return 'Debe ser un número válido';
    }
    if (field.min && value < field.min) {
      return `El valor debe ser mayor o igual a ${field.min}`;
    }
    if (field.max && value > field.max) {
      return `El valor debe ser menor o igual a ${field.max}`;
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const finalValue = files?.length ? files[0] : value;

    setFormData({ ...formData, [name]: finalValue });

    // Validación en tiempo real
    const error = validateField(name, finalValue);
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar todos los campos antes de enviar
    const newErrors = {};
    fields.forEach((field) => {
      const value = formData[field.name];
      const error = validateField(field.name, value);
      if (error) {
        newErrors[field.name] = error;
      }
      // Asignar "ND" si es un archivo no provisto
      if (field.type === 'file' && !value) {
        formData[field.name] = 'ND';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name}>
          <label>{field.label}</label>
          <input
            type={field.type || 'text'}
            name={field.name}
            value={field.type === 'file' ? undefined : formData[field.name] || ''}
            onChange={handleChange}
            min={field.min}
            max={field.max}
          />
          {errors[field.name] && <p className="error">{errors[field.name]}</p>}
        </div>
      ))}
      <button type="submit">{buttonText}</button>
    </form>
  );
}

export default FormComponent;