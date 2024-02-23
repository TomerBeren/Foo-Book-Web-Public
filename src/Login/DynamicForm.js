import React from 'react';
import FormField from '../Fields/FormField';
import RegistrationForm from '../Register/RegistrationForm';

const DynamicForm = ({ fields, submitLabel, handleSubmit }) => {
  return (
    <div style={{ maxWidth: '28rem', width: '100%' }}>
      <div className="bg-white shadow rounded p-3 input-group-lg">
        <form onSubmit={handleSubmit}>
          {fields.map((field, index) => (
            <FormField
              key={index}
              {...field}
            />
          ))}
          <button
            type="submit"
            className="btn btn-primary w-100 my-3">
            {submitLabel}
          </button>
          <div className="text-decoration-none text-center">
            <p>Forgotten password?</p>
          </div>
          <hr />
        </form>
        <RegistrationForm />
      </div>
      <div class="my-5 pb-5 text-center">
        <p class="fw-bold">
          <span class="text-decoration-none text-dark">Createa a Page </span>
          <span class="fw-normal">for a celebrity, band or business.</span>
        </p>
      </div>
    </div>
  );
};

export default DynamicForm;
