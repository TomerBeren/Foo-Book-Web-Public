import React, { useState, forwardRef, useImperativeHandle } from 'react';
import Avatar from './Avatar';
import EmojiPicker from './EmojiPicker'; 
import UploadButton from './UploadButton'; 
import { useUser } from '../UserContext';

const CreatePostForm = forwardRef(({ onFormSubmit }, ref) => {
    const { userDetails} = useUser();
    const [postText, setPostText] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleImageUpload = (url) => {
        setImageUrl(url || '');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFormSubmit({ text: postText, imageUrl });
    };

    // Expose the handleSubmit method to parent components via ref
    useImperativeHandle(ref, () => ({
        submitForm: () => {
            handleSubmit(new Event('submit'));
        }
    }));

    return (
        <form onSubmit={handleSubmit} className="d-flex flex-column">
            <div className="d-flex align-items-center">
                <div className="p-2">
                    <Avatar src={userDetails.profilePic} alt="from fb" />
                </div>
                <p className="m-0 fw-bold">{userDetails.displayName}</p>
            </div>
            <textarea
                cols="30"
                rows="5"
                className="form-control border mt-2"
                placeholder="How Are You Feeling?"
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
            ></textarea>

            <EmojiPicker />
            <UploadButton onImageUpload={handleImageUpload} />
        </form>
    );
});
export default CreatePostForm;
