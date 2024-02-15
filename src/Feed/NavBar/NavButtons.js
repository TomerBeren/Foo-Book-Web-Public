import React from 'react';
import NavButton from './NavButton';

const NavButtons = () => {
    return (
        <div className="col d-none d-xl-flex justify-content-center">
            <NavButton iconClass="fa-solid fa-house" isActive={true} />
            <NavButton iconClass="fa-solid fa-store" />
            <NavButton iconClass="fa-solid fa-users" notificationCount="1" isPosRel={true} isButton={true} />
            <NavButton iconClass="fa-solid fa-gamepad" />
        </div>
    );
};

export default NavButtons;
