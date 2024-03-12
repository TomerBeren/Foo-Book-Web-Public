import React, { useState } from 'react';
import RegistrationModal from './RegistrationModal';
import { registrationFields } from '../Fields/FieldsConfig';
import ProfilePicture from './ProfilePic';
import defaultpic from '../defaultpic.png';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmpassword: '',
    displayname: '',
    profilepic: ''
  });
  const [errors, setErrors] = useState({});
  const [profilePicPreview, setProfilePicPreview] = useState(defaultpic);
  const [showModal, setShowModal] = useState(false);
  const [usernameValidation, setUsernameValidation] = useState({
    isValid: true,
  });

  const checkUsernameAvailability = async (username) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/check-username?username=${username}`, {
        method: 'GET'
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error checking username');
      setUsernameValidation({ isValid: data.available }); // Update based on availability
      if (data.available === false) {
        setErrors(prevErrors => ({ ...prevErrors, username: 'Username is already taken.' }));
      } else {
        setErrors(prevErrors => ({ ...prevErrors, username: '' }));
      }
    } catch (error) {
      console.error('Error checking username availability:', error);
    }
  };

  const validateField = (name, value) => {
    if (!value.trim()) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`; // Capitalize field name for the message
    }

    switch (name) {
      case 'username':
        if (!usernameValidation.isValid) {
          return 'Username is already taken.'
        }
        break;
      case 'password':
        if (value.length < 8 || !/\d/.test(value) || !/[a-zA-Z]/.test(value)) {
          return 'Password must be at least 8 characters long, include at least one letter, and one number.';
        }
        break;
      case 'confirmpassword':
        if (value !== formData.password) {
          return 'Passwords do not match.';
        }
        break;
      default:
        return '';
    }
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: error }));
    if (name === 'username' && value !== '') {
      checkUsernameAvailability(value);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};
    let isFormValid = true;

    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        validationErrors[key] = error;
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      setErrors(validationErrors);
      alert("Please correct the errors before submitting.");
      return;
    }

    const submissionData = {
      ...formData,
      profilePic: profilePicPreview,
    };

    delete submissionData.confirmpassword; // Assuming you don't want to send this to the server
    delete submissionData.profilepic;
    try {
      const response = await fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Registration successful:', data);
        alert('Registration successful!');
        setShowModal(false);
        resetForm();
      } else {
        console.error('Registration error:', data);
        // Update errors state based on the response, maintaining other errors
        setErrors(prevErrors => ({
          ...prevErrors,
          ...validationErrors,
          ...(data.errors || {}),
          ...(response.status === 400 && data.message === 'Username already taken' ? { username: 'Username is already taken.' } : {})
        }));
      }
    } catch (error) {
      console.error('There was an error!', error);
      alert('An error occurred. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      username: '',
      password: '',
      confirmpassword: '',
      displayname: '',
      profilepic: ''
    });
    setErrors({});
    setProfilePicPreview(defaultpic);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleInputChange(e);
      const reader = new FileReader();
      reader.onloadend = () => setProfilePicPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setProfilePicPreview(defaultpic);
    }
  };

  const handleShowModal = () => setShowModal(true);

  const onHideModal = () => {
    setShowModal(false);
    resetForm();
  };

  return (
    <>
      <div className="text-center my-4">
        <button className="btn btn-success btn-lg" onClick={handleShowModal}>
          Create New Account
        </button>
      </div>
      <RegistrationModal
        show={showModal}
        onHide={onHideModal}
        fields={registrationFields.map(field => ({
          ...field,
          value: formData[field.name],
          onChange: field.type === 'file' ? handleProfilePicChange : handleInputChange,
          className: errors[field.name] ? 'is-invalid' : formData[field.name] ? 'is-valid' : '',
          errorMessage: errors[field.name],
        }))}
        handleSubmit={handleRegisterSubmit}
        submitLabel="Sign Up"
        errors={errors}
        profile={<ProfilePicture pictureUrl={profilePicPreview} />}
      />
    </>
  );
};

export default RegistrationForm;
