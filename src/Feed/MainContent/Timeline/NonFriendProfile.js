import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Avatar from "../../../CreatePosts/Avatar";

const NonFriendProfileModal = ({ show, onHide, theme, author, profilepic, userId }) => {
    const token = localStorage.getItem('token');

    const handleAddFriend = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/users/${userId}/friends`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || 'Failed to send friend request');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Failed to send friend request:', error);
            alert('An error occurred while trying to send the friend request.');
        } finally {
            onHide(); // Hide the modal after the operation
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{`Connect with ${author}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body className={`${theme === 'dark' ? 'text-white bg-dark' : 'bg-white'}`}>
            <div className="d-flex align-items-center">
                <div className="p-2">
                    <Avatar src={profilepic} alt="avatar" />
                </div>
                <p className="m-0 fw-bold">{author}</p>
            </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                <Button variant="primary" onClick={handleAddFriend}>Add Friend</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NonFriendProfileModal;
