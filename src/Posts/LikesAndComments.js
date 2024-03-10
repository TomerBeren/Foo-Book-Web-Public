import React, { useState, useEffect } from 'react';
import Likes from "./Likes";
import CommentsAccordion from "./CommentsAccordion";

const LikesAndComments = ({ postId, theme }) => {
  const [userId] = useState(localStorage.getItem('userId'))
  const [token] = useState(localStorage.getItem('token'));
  const [likeCount, setLikeCount] = useState(0);
  const [userLiked, setUserLiked] = useState(false);

  useEffect(() => {
    // Fetch the initial like status
    const fetchInitialLikeStatus = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/users/posts/${postId}/like-status`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Assuming Bearer token authentication
          },
        });
        const data = await response.json();
        setLikeCount(data.likeCount);
        setUserLiked(data.userLiked);
      } catch (error) {
        console.error('Error fetching initial like status:', error);
      }
    };
    fetchInitialLikeStatus();
  }, [postId]);

  const handleLikeClick = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${userId}/posts/${postId}/like`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Assuming Bearer token authentication
        },
        // Ensure your server is set up to handle and authenticate this request
      });
      const data = await response.json();

      setLikeCount(data.likeCount);
      setUserLiked(data.action === 'liked');
    } catch (error) {
      console.error('Error toggling like:', error);
      // Handle error (e.g., show an error message)
    }
  };

  const likesSummary = `${likeCount} Likes`;

  return (
    <div className="post_comment position-relative mt-3">
      {/* Likes display */}
      <Likes likesSummary={likesSummary} userLiked={userLiked}  />
      {/* Toggle comments button */}
      <CommentsAccordion theme={theme} action={userLiked} onLikeClick={handleLikeClick}/>
    </div>
  );
}

export default LikesAndComments;
