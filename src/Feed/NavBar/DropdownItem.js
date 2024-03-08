import React from 'react';

const DropdownItem = ({ imageUrl, title, subtitle }) => {
  return (
    <li className="dropdown-item p-1 rounded d-flex" type="button">
      <img
        src={imageUrl}
        alt="avatar"
        className="rounded-circle me-2"
        style={{ width: "45px", height: "45px", objectFit: "cover" }}
      />
      <div>
        <p className="m-0">{title}</p>
        <p className="m-0 text-muted">{subtitle}</p>
      </div>
    </li>
  );
};

export default DropdownItem;
