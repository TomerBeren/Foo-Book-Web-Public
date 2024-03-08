import React from 'react';

const ProfileActionItem = ({ iconClass, title, subtitle, onClick }) => {
  return (
    <li className="dropdown-item p-1 rounded d-flex align-items-center" type="button" onClick={onClick}>
      <i className={`${iconClass} bg-gray p-2 rounded-circle`}></i>
      <div className="ms-3">
        <p className="m-0">{title}</p>
        <p className="m-0 text-muted fs-7">{subtitle}</p>
      </div>
    </li>
  );
};

export default ProfileActionItem;
