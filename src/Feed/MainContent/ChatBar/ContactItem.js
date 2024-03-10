import React from 'react';

const ContactItem = ({ imageUrl, name, onRight, onLeft, leftButtonLabel, rightButtonLabel }) => {
  return (
    <li className="dropdown-item rounded my-2 px-0">
      <div className="d-flex justify-content-between align-items-center mx-2">
        <div className="d-flex align-items-center">
          <div className="position-relative">
            <img src={imageUrl} alt="avatar" className="rounded-circle me-2"
              style={{ width: "38px", height: "38px", objectFit: "cover" }} />
            <span className="position-absolute bottom-0 translate-middle border border-light rounded-circle bg-success p-1"
              style={{ left: "75%" }}>
              <span className="visually-hidden"></span>
            </span>
          </div>
          <p className="m-0">{name}</p>
        </div>
        <div>
          {onLeft && (
            <button className="btn btn-sm btn-primary me-2" onClick={onLeft}>{leftButtonLabel}</button>
          )}
          {onRight && (
            <button className="btn btn-sm btn-primary" onClick={onRight}>{rightButtonLabel}</button>
          )}
        </div>
      </div>
    </li>
  );
};

export default ContactItem;
