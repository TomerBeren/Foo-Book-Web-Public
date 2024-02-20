import React from 'react';

const UploadButton = ({ onImageUpload }) => {
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create a URL for the file: this is a local URL and does not mean the file is uploaded
      const fileUrl = URL.createObjectURL(file);
      // Call the passed in function with the file's local URL
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
