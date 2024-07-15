import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Avatar from "../../../CreatePosts/Avatar";
import ContactItem from "./ContactItem";
import ContactsHeader from "./ContactsHeader";

const friendListModal = ({ show, onHide, theme, author, profilepic, friendsList }) => {

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{`${author}'s Friend List`}</Modal.Title>
            </Modal.Header>
            <Modal.Body className={`${theme === 'dark' ? 'text-white bg-dark' : 'bg-white'}`}>
                <div className="d-flex align-items-center">
                    <div className="p-2">
                        <Avatar src={profilepic} alt="avatar" />
                    </div>
                    <p className="m-0 fw-bold">{author}</p>
                </div>
                <hr className="m-0" />
                <ContactsHeader title="Friend List" />
                {friendsList.map((friendList, index) => (
                    <ContactItem
                        key={index}
                        imageUrl={friendList.profilepic}
                        name={friendList.displayname}
                    />
                ))}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default friendListModal;
