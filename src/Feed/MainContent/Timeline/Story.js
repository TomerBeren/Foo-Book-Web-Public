// Story.js
import React from 'react';
import '../../../index.css'
const Story = ({ image, label, isMain , theme }) => {
  return (
    <div className={`mx-1 rounded story ${theme === 'dark' ? 'text-white bg-dark' : 'bg-white'}`} style={{ width: '6em', height: '190px' }} type="button">
      {isMain ? (
        <>
          <img src={image} alt={label} className="card-img-top rounded" style={{ minHeight: '125px', objectFit: 'cover' }} />
          <div className="d-flex align-items-center justify-content-center position-relative" style={{ minHeight: '65px' }}>
            <p className="mb-0 text-center fs-7 fw-bold">{label}</p>
            <div className="position-absolute top-0 start-50 translate-middle">
              <i className="fas fa-plus-circle fs-3 text-primary bg-white p-1 rounded-circle"></i>
            </div>
          </div>
        </>
      ) : (
        <img src={image} alt={label} className="card-img-top rounded" style={{ minHeight: '190px', objectFit: 'cover' }} />
      )}
    </div>
  );
};

export default Story;
