import React from 'react';

const FormField = ({type, name, id, placeholder, errorMessage, onChange, value ,className }) => {
 
  return (
    <div className="form-group">
      <input 
        type={type} 
        className={`form-control my-3 ${className}`}
        id={id} 
        name={name} 
        placeholder={placeholder}
        value={value} 
        onChange={onChange} 
        autoComplete="off"
      />
      {errorMessage && <div className="invalid-feedback">{errorMessage}</div>}
    </div>
  );
};

export default FormField;
