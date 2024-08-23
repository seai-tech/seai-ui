import React from 'react';
import styles from '../style/DocumentCreate.module.css'

const DocumentCreate = () => {
  return (
    <div>
      <h2 className={styles.pageTitle}>Create New Document</h2>
      <form>
        <div>
          <label>
            Name:
            <input
              type="text"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Number:
            <input
              type="text"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Issue Date:
            <input
              type="date"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Expiry Date:
            <input
              type="date"
            />
          </label>
        </div>
        <div>
          <label>
            Image:
            <input
              type="file"
              accept="image/*"
              required
            />
          </label>
        </div>
        <button className={styles.button} type="submit">
          Create Document
        </button>
      </form>
    </div>
  );
};

export default DocumentCreate;
