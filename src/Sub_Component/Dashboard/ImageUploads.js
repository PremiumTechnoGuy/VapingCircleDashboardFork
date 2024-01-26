import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FiEdit } from "react-icons/fi";


const ImageUploads = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div>
      {/* Actual input for file selection, hidden */}
      <input
        type="file"
        id="fileInput"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {/* Icon to trigger file selection */}
      <label htmlFor="fileInput">
        <FiEdit icon={faUpload} size="2x" style={{ cursor: 'pointer' }} />
        {/* <span>Upload Image</span> */}
      </label>

      {/* Display the selected file name (optional) */}
      {selectedFile && <p>Selected File: {selectedFile.name}</p>}
    </div>
  );
};

export default ImageUploads;