import React from "react";
const CommentToggle = ({ isOpen, onClick ,commentCount}) => {
    return (
        <h2 className="accordion-header" id="headingTwo">
            <div className="accordion-button collapsed pointer d-flex justify-content-end" onClick={onClick}>
                <p className="m-0">{isOpen ? 'Hide Comments' : commentCount}</p>
            </div>
        </h2>
    );
};

export default CommentToggle;