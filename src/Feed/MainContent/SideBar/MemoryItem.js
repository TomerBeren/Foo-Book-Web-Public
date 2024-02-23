import React from 'react';

const MemoryItem = ({ src, label }) => {
    return (
        <li className="dropdown-item p-1 rounded">
            <span className="text-decoration-none text-dark d-flex align-items-center">
                <div className="p-2">
                    <img src={src} alt={label}
                    className="rounded border border-1 border-secondery me-2"
                    style={{ width: '38px', height: '38px', objectFit: 'cover' }} />
                </div>
                <p className="m-0 mt-1 fw-semibold">{label}</p>
            </span>
        </li>
    );
};

export default MemoryItem;
