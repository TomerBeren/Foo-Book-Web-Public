import React from 'react';

const SponsorItem = ({ imageUrl, siteName, theme }) => {
  return (
    <li className="dropdown-item my-2 d-flex justify-content-between">
      <button className="text-decoration-none text-dark d-flex align-items-center border-0 bg-transparent p-0">
        <div style={{width: "180px", height: "100px", overflow: "hidden"}} className="me-3 rounded">
          <img src={imageUrl} alt=" " style={{width: "100%", height: "100%", objectFit: "cover"}} />
        </div>
        <div>
          <p className="m-0">meow</p>
          <span className="text-muted fs-7">{siteName}</span>
        </div>
      </button>
      <div className="rounded-circle d-flex align-center justify-content-center p-1 bg-white mx-2 nav-item"
          type="button" style={{width: "38px", height: "38px"}}>
        <i className={`fas fa-ellipsis-h p-2 ${theme === 'dark' ? 'text-black' : 'text-muted'}`}></i>
      </div>
    </li>
  );
};

export default SponsorItem;
