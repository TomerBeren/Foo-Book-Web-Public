import React from 'react';

const IconCircle = ({ iconClass }) => {
    return (
        <div className="d-flex align-items-center justify-content-center p-1 mx-2 rounded-circle bg-body-secondary" style={{ width: "38px", height: "38px", objectFit: "cover" }}>
            <i className={iconClass}></i>
        </div>
    );
};

export default IconCircle;
