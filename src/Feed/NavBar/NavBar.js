import React from 'react';
import SearchBox from './SearchBox';
import defaultAvatar from './../../defaultpic.png';
import UserProfile from './UserProfile';
import NavButtons from './NavButtons';
import IconCircle from './IconCircle';

const Navbar = ({theme}) => {
    return (
        <div className={`d-flex align-items-center fixed-top shadow ${theme === 'dark' ? 'text-white bg-dark' : 'bg-white'}`} style={{ minHeight: '56px', zIndex: 5 }}>
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col d-flex align-items-center">
                        <i className="fa-brands fa-facebook text-primary" style={{ fontSize: "3rem" }}></i>
                        <SearchBox theme={theme} />
                    </div>
                    <NavButtons />
                    <div className="col d-flex align-items-center justify-content-end">
                        <UserProfile name="Tomer" avatar={defaultAvatar} />
                        <IconCircle iconClass="fa-solid fa-ellipsis" />
                        <IconCircle iconClass="fa-solid fa-comment" />
                        <IconCircle iconClass="fa-solid fa-bell" />
                        <IconCircle iconClass="fa-solid fa-caret-down" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
