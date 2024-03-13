import React, { useState, useEffect } from 'react';
import DynamicForm from './DynamicForm';
import { loginFields } from '../Fields/FieldsConfig';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Authorization/AuthContext';
import { useUser } from '../UserContext';
const LoginForm = () => {
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const { userDetails, setUserDetails } = useUser();
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

        const loginResponse = await fetch('http://localhost:8080/api/tokens', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: encodedFormData.toString()
        })

        const loginData = await loginResponse.json();

        if (loginData.result === 'Success' && loginData.token) {

            localStorage.setItem('userId', loginData.userId);
            localStorage.setItem('token', loginData.token);

            // Fetch user details using the JWT
            const userDetailsResponse = await fetch(`http://localhost:8080/api/users/${loginData.userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${loginData.token}`,
                },
            });

            if (!userDetailsResponse.ok) {
                throw new Error('Failed to fetch user details');
            }

            const userDetailsJson = await userDetailsResponse.json(); // Convert response to JSON
            console.log("Fetched User Details:", userDetailsJson);

            setUserDetails({
                displayName: userDetailsJson.displayname,
                profilePic: userDetailsJson.profilepic,
                friendsList: userDetailsJson.friendsList, // Adjust these keys based on your actual user details structure
            });

            alert('Successful Login');
            login();
            navigate('/feed');

        }
        else {
            setErrors(prevErrors => ({ ...prevErrors, form: "Invalid username or password" }));
            alert(loginData.reason);
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
