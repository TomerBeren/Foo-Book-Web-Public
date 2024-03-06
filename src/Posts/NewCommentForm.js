import React, { useState } from 'react';
import Avatar from '../CreatePosts/Avatar';
import defaultPic from '../defaultpic.png';
import { useUser } from '../UserContext';

const NewCommentForm = ({ onCommentSubmit, comments, onEditComment, onDeleteComment, theme }) => {
    const { userDetails, setUserDetails } = useUser();
    const [commentText, setCommentText] = useState('');
    const [isEditing, setIsEditing] = useState(null);
    const [editText, setEditText] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (commentText.trim() !== '') {
            onCommentSubmit({ id: Date.now(), text: commentText });
            setCommentText('');
        }
    };

    const handleEdit = (id, text) => {
        setIsEditing(id);
        setEditText(text);
    };

    const handleEditSubmit = (id) => {
        onEditComment(id, editText);
        setIsEditing(null);
        setEditText('');
    };

    return (
        <div className="accordion-body">
            {comments.map(({ id, text }) => (
                <div key={id} className="comments-list d-flex flex-row align-items-center my-1 ">
                    <div className="mt-3">
                    <Avatar src={userDetails.profilePic} alt="profilePic" />
                    </div>
                    <div className="p-2 rounded w-100">
                        {isEditing === id ? (
                            <>
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                                    <input type="text" className={`form-control border-0 rounded-pill bg-gray ${theme === 'dark' ? 'text-black' : ''}`} value={editText} onChange={(e) => setEditText(e.target.value)} />
                                    <button className="rounded btn btn-secondary" onClick={() => handleEditSubmit(id)}>Save</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <p className="fw-bold m-0">{userDetails.displayName}</p>
                                <p className={`m-0 fs-6 p-2 bg-gray rounded ${theme === 'dark' ? 'text-black' : ''}`}>{text}</p>
                            </>
                        )}
                    </div>
                    {isEditing !== id ? (
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                            <button className="rounded btn btn-secondary" onClick={() => handleEdit(id, text)}>Edit</button>
                            <button className="rounded btn btn-secondary" onClick={() => onDeleteComment(id)}>Delete</button>
                        </div>
                    ) : ('')}
                </div>
            ))}
            <form className="d-flex mt-4" onSubmit={handleSubmit}>
                <Avatar src={userDetails.profilePic} alt="avatar" />
                <input type="text" className={`form-control border-0 rounded-pill ${theme === 'dark' ? 'bg-black' : 'bg-gray'}`} placeholder="Write a comment"
                    value={commentText} onChange={(e) => setCommentText(e.target.value)} />
            </form>
        </div>
    );
};

export default NewCommentForm;
