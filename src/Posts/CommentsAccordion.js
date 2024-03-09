import React, { useState } from 'react';
import CommentsToggle from './CommentsToggle';
import LikeAndCommentBar from './LikeAndCommentBar';
import NewCommentForm from './NewCommentForm';

const CommentsAccordion = ({ onLikeClick , theme, action}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState([]); // Initialize comments as an empty array

  const toggleComments = () => setIsOpen(!isOpen);

  const addComment = (newComment) => {
    setComments([newComment, ...comments]);
  };

  const onEditComment = (id, updatedText) => {
    setComments(comments.map(comment => comment.id === id ? { ...comment, text: updatedText } : comment));
  };

  const onDeleteComment = (id) => {
    setComments(comments.filter(comment => comment.id !== id));
  };

  
    const count = comments.length;
    let commentCount =`${count} Comment${count !== 1 ? 's' : ''}`; 
  
  return (
    <div className="accordion" id="accordionExample">
      <div className="accordion-item border-0">
        <CommentsToggle isOpen={isOpen} onClick={toggleComments} commentCount={commentCount}/>
        <hr />
        <LikeAndCommentBar onLikeClick={onLikeClick} onCommentClick={toggleComments} action={action} />
        {isOpen && (
          <div id="collapsePost1" className="accordion-collapse collapse show">
            <NewCommentForm theme={theme} onCommentSubmit={addComment} comments={comments} onEditComment={onEditComment} onDeleteComment={onDeleteComment} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsAccordion;
