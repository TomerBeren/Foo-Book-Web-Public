import React from 'react';

const FloatingActionButton = ({ onClick }) => {
    return (
        <div className="fixed-bottom right-100 p-3" style={{ zIndex: 6, left: 'initial' }}>
            {/* Call the onClick callback function when the button is clicked */}
            <button className="btn btn-primary btn-sm" type="button" onClick={onClick}>Dark Mode</button>
        </div>
    );
};

export default FloatingActionButton;
