import React from 'react';
import SearchBox from './SearchBox';
import UserProfile from './UserProfile';
import NavButtons from './NavButtons';
import IconCircle from './IconCircle';
import { useUser } from '../../UserContext';

const Navbar = ({ theme }) => {
    const { userDetails } = useUser();

    return (
        <div className={`d-flex align-items-center fixed-top shadow pad ${theme === 'dark' ? 'text-white bg-dark' : 'bg-white'}`} style={{ minHeight: '56px', zIndex: 5 }}>
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col d-flex align-items-center">
                        <i className="fa-brands fa-facebook text-primary" style={{ fontSize: "3rem" }}></i>
                        <SearchBox theme={theme} />
                    </div>
                    <NavButtons />
                    <div className="col d-flex align-items-center justify-content-end">
                        <UserProfile name={userDetails.displayName} avatar={userDetails.profilePic} />
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
