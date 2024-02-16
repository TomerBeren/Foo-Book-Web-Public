import React from 'react';

const SeeMoreButton = () => {
    return (
        <li className="dropdown-item p-2 rounded" type="button">
            <div className="d-flex align-items-center">
                <div className="p-2">
                    <div className="i fas fa-chevron-down rounded-circle p-2"
                        style={{ backgroundColor: '#d5d5d5' }}></div>
                </div>
                <div>
                    <p className="m-0 ms-2 fw-semibold">See More</p>
                </div>
            </div>
        </li>
    );
};

export default SeeMoreButton;
