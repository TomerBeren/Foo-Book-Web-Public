import React from "react";

const Header = ({ children }) => {
    return (
        <div className="container d-flex flex-column flex-lg-row justify-content-evenly mt-5 pt-5">
            {children}
        </div>
    );
};

export default Header;
