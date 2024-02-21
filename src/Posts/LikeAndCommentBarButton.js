import React from 'react';
import ShareOptionsMenu from './ShareOptionsMenu'
const LikeAndCommentBarButton = ({ onButtonClick, isShare, text}) => {

    const iconClass = text === "Like" ? "fa-thumbs-up" : 
    text === "Comment" ? "fa-comment-alt" : 
    "fa-share";
    const shareAttributes = isShare ? { 'data-bs-toggle': 'dropdown', 'aria-expanded': 'false' } : {};
    return(

        <div className="dropdown-item rounded d-flex justify-content-center align-items-center pointer text-muted p-1 dropdown" onClick={onButtonClick} {...shareAttributes}>
            <i className={`fas ${iconClass} me-3`}></i>
            <p className="m-0">{text}</p>
            {isShare && <ShareOptionsMenu />}
        </div>
    );
}
export default LikeAndCommentBarButton;