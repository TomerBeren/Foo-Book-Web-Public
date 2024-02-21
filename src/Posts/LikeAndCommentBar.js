import React from 'react';
import LikeAndCommentBarButton from './LikeAndCommentBarButton';

const LikeAndCommentBar = ({ onLikeClick, onCommentClick }) => {

  return (
    <div className="d-flex justify-content-around">

      <LikeAndCommentBarButton onButtonClick={onLikeClick} isShare={false} text={"Like"}  />
      <LikeAndCommentBarButton onButtonClick={onCommentClick} isShare={false} text={"Comment"} />
      <LikeAndCommentBarButton isShare={true} text={"Share"} />

    </div>
  );
};

export default LikeAndCommentBar;