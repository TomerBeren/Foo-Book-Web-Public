import React, { useState } from 'react';
import CreatePostModal from './CreatePostModal';
import ActionButton from './ActionButton';
import Avatar from './Avatar';
import '../index.css'
import { useUser } from '../UserContext';

const CreatePostComponent = ({OnCreatePost ,theme}) => {
  const { userDetails} = useUser();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className={`p-3 mt-3 rounded border shadow ${theme === 'dark' ? 'text-white bg-dark' : 'bg-white'}`}>
      <div className="d-flex" type="button" onClick={() => setModalIsOpen(true)}>
        <div className="p-1">
          <Avatar src={userDetails.profilePic} alt="avatar" />
        </div>
        <input type="text" className={`form-control rounded-pill border-0 pointer ${theme === 'dark' ? 'bg-black' : 'bg-gray '}`}
               placeholder={`What's on your mind, ${userDetails.displayName}?`} readOnly />
      </div>
      <CreatePostModal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} onCreatePost={OnCreatePost} />
      <hr />
      <div className="d-flex flex-lg-row mt-3">
        <ActionButton iconClass="fas fa-video" text="Live Video" colorClass="text-danger" />
        <ActionButton iconClass="fas fa-photo-video" text="Photo/Video" colorClass="text-success" />
        <ActionButton iconClass="fas fa-smile" text="Feeling/Activity" colorClass="text-warning" />
      </div>
    </div>
  );
};

export default CreatePostComponent;
