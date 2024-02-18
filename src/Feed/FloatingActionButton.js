import React from 'react';

const FloatingActionButton = ({ onClick }) => {
    return (
        <>
            {/* Call the onClick callback function when the button is clicked */}
            <button className="btn btn-primary btn-sm" type="button" onClick={onClick}>Dark Mode</button>
        </>
    );
};

export default FloatingActionButton;
