import React from 'react';
import styles from '../style/DocumentUpdate.module.css';

const DocumentUpdate = () => {
  const document = {
    name: '',
    number: '',
    issueDate: '',
    expiryDate: '',
  };
  const imageUrl = '';

  return (
    <div>
      <h2 className={styles.pageTitle}>Edit Document</h2>
      <form>
      
      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={document.name}
          />
        </label>
      </div>
      <div>
        <label>
          Number:
          <input
            type="text"
            name="number"
            value={document.number}
          />
        </label>
      </div>
      <div>
        <label>
          Issue Date:
          <input
            type="date"
            name="issueDate"
            value={document.issueDate.split('T')[0]}
          />
        </label>
      </div>
      <div>
        <label>
          Expiry Date:
          <input
            type="date"
            name="expiryDate"
            value={document.expiryDate?.split('T')[0] || ''}
          />
        </label>
      </div>
      <div>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Document"
          />
        )}
        <button className={styles.changePhotoBtn}>Change Photo</button>
        <input
          type="file"
          accept="image/*"
        />
      </div>
      <div>
        <button><i class="fa-solid fa-file-pen"></i>    Update</button>
      </div>
      </form>
    </div>
  );
};

export default DocumentUpdate;
