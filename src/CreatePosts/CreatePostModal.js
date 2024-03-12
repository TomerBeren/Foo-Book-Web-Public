import React, { useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import CreatePostForm from './CreatePostForm';

const CreatePostModal = ({ isOpen, onRequestClose, onCreatePost }) => {
    const formRef = useRef();

    const handlePostSubmission = () => {
        // Trigger form submission through the ref
        formRef.current.submitForm();
    };

    return (
        <Modal show={isOpen} onHide={onRequestClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Create Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CreatePostForm ref={formRef} onFormSubmit={(formData) => {
                    const newPost = {
                        ...formData,
                    };
                    onCreatePost(newPost);
                    onRequestClose();
                }} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onRequestClose}>Close</Button>
                <Button variant="primary" onClick={handlePostSubmission}>Post</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreatePostModal;
