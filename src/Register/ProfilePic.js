// ProfilePicture.js
import React from 'react';
import './ProfilePic.css'

const ProfilePicture = ({ pictureUrl }) => {
  return (
    <div className="profile-picture-container">
      <img src={pictureUrl} alt="Profile" className="profile-picture"/>
    </div>
  );
};

export default ProfilePicture;
