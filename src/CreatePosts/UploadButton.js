import React from 'react';

const UploadButton = ({ onImageUpload }) => {
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(reader.result);
      };
      reader.readAsDataURL(file);
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
