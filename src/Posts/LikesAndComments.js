import React, { useState } from 'react';
import Likes from "./Likes";
import CommentsAccordion from "./CommentsAccordion";

const LikesAndComments = ({ postId, theme, userLiked, likeCount }) => {
  const [userId] = useState(localStorage.getItem('userId'))
  const [token] = useState(localStorage.getItem('token'));
  const [likesCount, setLikesCount] = useState(likeCount);
  const [liked, setLiked] = useState(userLiked);

  const handleLikeClick = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${userId}/posts/${postId}/like`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();

      setLikesCount(data.likeCount);
      setLiked(data.action === 'liked');
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const likesSummary = `${likesCount} Likes`;

  return (
    <div className="post_comment position-relative mt-3">
      {/* Likes display */}
      <Likes likesSummary={likesSummary} liked={liked} />
      {/* Toggle comments button */}
      <CommentsAccordion theme={theme} action={liked} onLikeClick={handleLikeClick} />
    </div>
  );
}

export default LikesAndComments;
