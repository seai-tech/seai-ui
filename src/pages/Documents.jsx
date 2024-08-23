import React from 'react';
import styles from '../style/Documents.module.css';
import { Link } from 'react-router-dom';


const Documents = () => {
  const documents = [];
  const documentImages = {};
  const selectedDocuments = [];

  return (
    <div className={styles.content}>
      <h2 className={styles.pageTitle}>Documents</h2>
      <div className={styles.buttonContainer}>
        <button className={styles.btnDownload} disabled={!selectedDocuments.length}><i class="fa-solid fa-download"></i>    Download Selected</button>
        <Link to="/documents/create" className={styles.button}><i class="fa-solid fa-plus"></i>   Create Document</Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Preview</th>
            <th>Name</th>
            <th>Number</th>
            <th>Issue Date</th>
            <th>Expiry Date</th>
            <th>Verification Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((document) => (
            <tr key={document.id}>
              <td>
                <input type="checkbox" />
              </td>
              <td>
                {documentImages[document.id] ? (
                  <img alt={document.name} />
                ) : (
                  <p>Loading...</p>
                )}
              </td>
              <td>{document.name}</td>
              <td>{document.number}</td>
              <td>{document.issueDate}</td>
              <td>{document.expiryDate}</td>
              <td>{/* Verification status goes here */}</td>
              <td>
                <a href={`/documents/${document.id}`}>View Details</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Documents;
