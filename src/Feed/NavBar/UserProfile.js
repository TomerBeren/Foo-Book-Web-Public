import React from 'react';

const UserProfile = ({ name, avatar }) => {
    return (
        <div className="d-xl-flex d-none align-items-center justify-content-center">
            <img src={avatar} alt="avatar" className="rounded-circle me-2" style={{width: "38px", height: "38px", objectFit: "cover"}} />
            <p className="m-0">{name}</p>
        </div>
    );
};

export default UserProfile;
