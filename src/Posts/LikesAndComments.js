import React, { useState } from 'react';
import Likes from "./Likes";
import CommentsAccordion from "./CommentsAccordion";
 
const LikesAndComments = ({theme}) => {
  const [likeCount, setLikeCount] = useState(0); 
 
  const handleLikeClick = () => {
    console.log("like");
    setLikeCount(likeCount + 1); // Increment the like count
  };

  const likesSummary=`${likeCount} Likes`;

  return (
    <div className="post_comment position-relative mt-3">
      {/* Likes display */}
      <Likes likesSummary={likesSummary} />
      {/* Toggle comments button */}
      <CommentsAccordion theme={theme} onLikeClick={handleLikeClick}/>
    </div>
  );
}

export default LikesAndComments;