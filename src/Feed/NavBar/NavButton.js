import React from 'react';

const NavButton = ({ iconClass, isActive = false, notificationCount = '', isPosRel=false, isButton=false}) => {

    const activeClass = isActive ? 'nav__btn-active' : '';
    const activePosRel = isPosRel ? 'position-relative' : '';
    const notificationBadge = notificationCount ? (
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
        style={{ fontSize: ".5rem" }}>
            {notificationCount}
            <span className="visually-hidden"></span>
        </span>
    ) : null;

    return (
        <div className={`mx-4 nav__btn ${activeClass}`}>
            <button  type={isButton ? "button" : undefined} className="btn px-4">
                <i className={`${iconClass} text-muted fs-4 ${activePosRel}`}>
                    {notificationBadge}
                </i>
            </button>
        </div>
    );
};

export default NavButton;
