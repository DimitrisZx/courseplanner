import React, { useState } from 'react';
import { uploadFile } from '../../features/store/stateSlice'

export default function AdminPanel() {

  const [fileToUpload, setFileToUpload] = useState();
  function handleChange(e) {
    debugger;
    setFileToUpload(e.target.files[0]);
  }
  async function handleClick() {
    await uploadFile(fileToUpload);
    alert('File Uploaded');
  }
  
  return (
    <div>
      <h3>Μεταφόρτωση Προγραμμάτος</h3>
      <input
        type="file"
        name="fileUpload"
        id="fileUpload"
        onChange={handleChange}  
      />
      <button className="btn btn-primary" onClick={handleClick}>Μεταφόρτωση</button> 
    </div>
  )
}
