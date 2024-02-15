import React from 'react';


const SearchBox = ({ theme }) => {
    return (
        <div className="input-group ms-2">
            {/* mobile */}
            <span
                class="input-group-prepend d-lg-none">
                <div className="input-group-text bg-gray border-0 rounded-circle"
                    style={{ minHeight: "40px" }}>
                    <i class="fas fa-search text-muted"></i>
                </div>
            </span>
            {/* desktop */}
            <span className="input-group-prepend d-none d-lg-block">
                <div className="input-group-text bg-gray border-0 rounded-pill" style={{ minHeight: "40px", minWidth: "230px" }}>
                    <i className={`fas fa-magnifying-glass me-2 ${theme === 'dark' ? 'text-black' : 'text-muted'}`}> </i>
                    <p className={`m-0 fs-7  ${theme === 'dark' ? 'text-black' : 'text-muted'}`}>Search FooBook</p>
                </div>
            </span>
        </div>
    );
};

export default SearchBox;
