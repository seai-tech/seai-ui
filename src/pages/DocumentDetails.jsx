import React from 'react';
import styles from '../style/DocumentDetails.module.css';

const DocumentDetails = () => {
  const document = null;
  const imageUrl = '';

  return (
    <div>
      <h2 className={styles.pageTitle}>Document Details</h2>
      {document ? (
        <>
          <p><strong>Name:</strong> {document.name}</p>
          <p><strong>Number:</strong> {document.number}</p>
          <p><strong>Issue Date:</strong> {document.issueDate}</p>
          <p><strong>Expiry Date:</strong> {document.expiryDate || 'N/A'}</p>
          <p><strong>Status:</strong> {/* Verification status goes here */}</p>
          {imageUrl && (
            <div>
              <img src={imageUrl} alt="Document" />
              <button className={styles.btnDownload}><i class="fa-solid fa-download"></i>    Download Image</button>
            </div>
          )}
          <div>
            <button><i class="fa-solid fa-file-pen"></i>   Update</button>
            <button className={styles.btnDelete}><i class="fa-solid fa-trash-can"></i>   Delete</button>
          </div>
        </>
      ) : (
        <p>No document found</p>
      )}
    </div>
  );
};

export default DocumentDetails;
