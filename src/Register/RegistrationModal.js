import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FormField from '../Fields/FormField';

const RegistrationModal = ({ show, onHide, fields, handleSubmit, submitLabel, errors, profile }) => {
   
    // Map fields to FormField components
    const renderedFields = fields.map((field, index) => (
        <FormField
            key={index}
            {...field}
            errorMessage={errors[field.name]}
        />
    ));

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{submitLabel}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Using a form to wrap inputs and submit button */}
                <form onSubmit={handleSubmit}>
                    {renderedFields}
                    {profile}
                    {/* Modal Footer within the form for proper submission handling */}
                    <Modal.Footer>
                        <Button variant="secondary" onClick={onHide}>Close</Button>
                        <Button variant="success" type="submit">{submitLabel}</Button>
                    </Modal.Footer>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default RegistrationModal;
