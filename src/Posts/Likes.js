import React from 'react';

const Likes = ({ likesSummary, userLiked}) => {
  return (
    <div className="d-flex align-items-center">
      <div className="me-2">
        {userLiked ? (
          <i className="text-primary fas fa-thumbs-up"></i>
        ) : (
          <i className="text-muted fas fa-thumbs-up"></i>
        )}
        {/* Other icons can remain unchanged or be adjusted similarly */}
      </div>
      <p className="m-0 text-muted fw-bold fs-7">{likesSummary}</p>
    </div>
  );
};

export default Likes;
