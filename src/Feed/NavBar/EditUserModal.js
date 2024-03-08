import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useUser } from '../../UserContext';

const EditUserModal = ({ show, onHide, onSave }) => {
    const { userDetails } = useUser();
    const [displayName, setDisplayName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        setDisplayName(userDetails.displayName || '');
        setSelectedFile(null); // Reset selected file state when the modal is reopened or when user changes
    }, [userDetails, show]);

    const handleDisplayNameChange = (e) => setDisplayName(e.target.value);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSave = () => {
        onSave(displayName,selectedFile);
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit User Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Display Name</Form.Label>
                        <Form.Control type="text" value={displayName} onChange={handleDisplayNameChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Profile Picture</Form.Label>
                        <Form.Control type="file" onChange={handleFileChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                <Button variant="primary" onClick={handleSave}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditUserModal;
