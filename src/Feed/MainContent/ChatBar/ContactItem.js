import React from 'react';

const ContactItem = ({ imageUrl, name }) => {
  return (
    <li className="dropdown-item rounded my-2 px-0">
      <div className="d-flex align-items-center mx-2">
        <div className="position-relative">
          <img src={imageUrl} alt="avatar" className="rounded-circle me-2"
              style={{width: "38px", height: "38px", objectFit: "cover"}} />
          <span className="position-absolute bottom-0 translate-middle border border-light rounded-circle bg-success p-1"
                style={{left: "75%"}}>
            <span className="visually-hidden"></span>
          </span>
        </div>
        <p className="m-0">{name}</p>
      </div>
    </li>
  );
};

export default ContactItem;
