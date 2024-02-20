import React from 'react';

const Avatar = ({ src, alt }) => {
  return (
    <img src={src} alt={alt} className="rounded-circle me-2" style={{ width: "38px", height: "38px", objectFit: "cover" }} />
  );
};

export default Avatar;
