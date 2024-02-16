import React from 'react';
import './SideBarItem.css'
const SideBarItem = ({ icon, label, link }) => {
    return (
        <li className="dropdown-item p-1 rounded">
            <a href={link} className="text-decoration-none text-dark d-flex align-items-center">
                <div className="p-2">
                    <img src={icon} alt="avatar" className="rounded-circle me-2" style={{ width: '38px', height: '38px', objectFit: 'cover' }} />
                </div>
                <p className="m-0 mt-1 fw-semibold">{label}</p>
            </a>
        </li>
    );
};

export default SideBarItem;
