import React from 'react';

const UploadButton = ({ onImageUpload }) => {
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      onImageUpload(fileUrl);
    }
  };

  return (
    <div>
      <label htmlFor="fileUpload" className="form-label fw-bold">Upload Picture</label>
      <input className="form-control" type="file" id="fileUpload" onChange={handleFileChange} />
    </div>
  );
};

export default UploadButton;
