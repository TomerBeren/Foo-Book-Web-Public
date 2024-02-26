import React from 'react';

const FloatingActionButton = ({ onClick }) => {
    return (
        <>
            <button className="btn btn-primary btn-sm" type="button" onClick={onClick}>Dark Mode</button>
        </>
    );
};

export default FloatingActionButton;
