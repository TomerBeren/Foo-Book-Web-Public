import React from 'react';

const Likes = ({ likesSummary, liked}) => {
  return (
    <div className="d-flex align-items-center">
      <div className="me-2">
        {liked ? (
          <i className="text-primary fas fa-thumbs-up"></i>
        ) : (
          <i className="text-muted fas fa-thumbs-up"></i>
        )}
      </div>
      <p className="m-0 text-muted fw-bold fs-7">{likesSummary}</p>
    </div>
  );
};

export default Likes;
