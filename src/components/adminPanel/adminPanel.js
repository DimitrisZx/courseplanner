import React, { useState } from 'react';
import { uploadFile } from '../../features/store/stateSlice';
import './style.css';
export default function AdminPanel() {

  const [fileToUpload, setFileToUpload] = useState(null);

  function handleChange(e) {
    setFileToUpload(e.target.files[0]);
  }

  async function handleClick() {
    await uploadFile(fileToUpload);
    alert('File Uploaded');
  }
  
  return (
    <div className="card shadow-sm mt-4  custom">
      <div className="card-body">
        <h3 className="card-title">Μεταφόρτωση Προγραμμάτος</h3>
        <hr/>
        <div className="card-text">
          {'Επιλέξτε το κατάλληλο αρχείο σε μορφή JSON, με πρόγραμμα περιόδου.'}  
        </div>
        <div className="controls mt-3">
          <label for="fileUpload">Επιλογή Αρχείου:{" "}</label>
          <br/>
          <input
            type="file"
            name="fileUpload"
            id="fileUpload"
            onChange={handleChange}  
          />
          <button className="btn btn-primary" disabled={!fileToUpload} onClick={handleClick}>Μεταφόρτωση</button> 
        </div>    
      
      </div>
    </div>
  )
}
