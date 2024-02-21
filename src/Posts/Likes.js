import React from 'react';

const Likes = ({ likesSummary }) => {
  return (
    <div className="d-flex align-items-center">
      <div className="me-2">
        <i className="text-primary fas fa-thumbs-up"></i>
        <i className="text-danger fab fa-gratipay"></i>
        <i className="text-warning fas fa-grin-squint"></i>
      </div>
      <p className="m-0 text-muted fw-bold fs-7">{likesSummary}</p>
    </div>
  );
};

export default Likes;