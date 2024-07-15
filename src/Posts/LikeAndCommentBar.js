import React from 'react';
import LikeAndCommentBarButton from './LikeAndCommentBarButton';

const LikeAndCommentBar = ({ onLikeClick, onCommentClick, action }) => {
  // Determine button text based on the action prop
  const likeButtonText = action ? "unlike" : "Like";

  return (
    <div className="d-flex justify-content-around">
      <LikeAndCommentBarButton 
        onButtonClick={onLikeClick} 
        isShare={false} 
        text={likeButtonText} // Use the dynamic text
      />
      <LikeAndCommentBarButton 
        onButtonClick={onCommentClick} 
        isShare={false} 
        text={"Comment"} 
      />
      <LikeAndCommentBarButton 
        isShare={true} 
        text={"Share"} 
      />
    </div>
  );
};

export default LikeAndCommentBar;
