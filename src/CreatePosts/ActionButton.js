import React from 'react';

const ActionButton = ({ iconClass, text, colorClass }) => {
    return (
        <div className="d-flex align-items-center justify-content-center rounded dropdown-item">
            <i className={`${iconClass} ${colorClass} me-2`}></i>
            <span className="text-muted">{text}</span>
        </div>
    );
};

export default ActionButton;
