import React, { useState } from 'react';
import DynamicForm from './DynamicForm';
import { loginFields } from '../Fields/FieldsConfig';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Authorization/AuthContext';

const LoginForm = () => {
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Validation function
    const validateField = (name, value) => {
        if (!value.trim()) {
            return `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
        }
        return '';
    };

    // Handle input change and validate the field
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    // Validate all fields on form submission
    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        let isValid = true;
        const validationErrors = {};
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) {
                validationErrors[key] = error;
                isValid = false;
            }
        });

        setErrors(validationErrors);

        if (!isValid) {
            alert("Please correct the errors before submitting.");
            return;
        }

        // Encode form data
        const encodedFormData = new URLSearchParams();
        Object.keys(formData).forEach(key => {
            encodedFormData.append(key, formData[key]);
        });

        const result = await fetch('http://localhost:8080/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: encodedFormData.toString()
        })

        const data = await result.json();
        // Proceed with login if validation passes
        if (data.result == 'Success') {
            alert('Successful Login');
            login();
            navigate('/feed');
        } else {
            setErrors(prevErrors => ({ ...prevErrors, form: "Invalid username or password" }));
            alert(data.reason);
        }
    };

    const loginFieldsWithHandlers = loginFields.map(field => ({
        ...field,
        value: formData[field.name],
        onChange: handleInputChange,
        className: errors[field.name] ? 'is-invalid' : '',
        errorMessage: errors[field.name],
    }));

    return (
        <DynamicForm
            fields={loginFieldsWithHandlers}
            submitLabel="Log In"
            handleSubmit={handleLoginSubmit}
            errors={errors}
        />
    );
};

export default LoginForm;
