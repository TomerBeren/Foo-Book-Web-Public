import React, { useState } from 'react';

const PostOptionsMenu = ({onEdit,  onDelete}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className="position-relative">
            <button className="btn btn-outline-secondary btn-sm" onClick={toggleMenu} aria-expanded={isOpen}>
                <i className="fas fa-edit"></i>
            </button>
            {isOpen && (
                <ul className="dropdown-menu show" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: '30px' }}>
                    <li><a className="dropdown-item" href="#!" onClick={onEdit}>Edit Post</a></li>
                    <li><a className="dropdown-item" href="#!" onClick={onDelete}>Delete Post</a></li>
                </ul>
            )}
        </div>
    );
};

export default PostOptionsMenu;
