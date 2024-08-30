import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { saveAs } from 'file-saver';
import Loading from '../../components-redo/Loading';

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [documentImages, setDocumentImages] = useState({});
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [documentsPerPage, setDocumentsPerPage] = useState(10);
  const { userId, accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocuments = async () => {
      if (!userId || !accessToken) {
        setError('User ID or Access Token is missing');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://api.seai.co/api/v1/users/${userId}/documents`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setDocuments(data);
          fetchDocumentImages(data);
        } else {
          setError('Failed to fetch documents');
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
        console.error('Error fetching documents:', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchDocumentImages = async (documents) => {
      const images = {};

      for (const document of documents) {
        try {
          const response = await fetch(`https://api.seai.co/api/v1/users/${userId}/documents/${document.id}/files`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const imageBlob = await response.blob();
            images[document.id] = URL.createObjectURL(imageBlob);
          } else {
            console.error(`Failed to fetch image for document ${document.id}`);
          }
        } catch (err) {
          console.error(`Error fetching image for document ${document.id}:`, err);
        }
      }

      setDocumentImages(images);
    };

    fetchDocuments();
  }, [userId, accessToken]);

  const handleSelectDocument = (documentId) => {
    setSelectedDocuments((prevSelected) =>
      prevSelected.includes(documentId)
        ? prevSelected.filter((id) => id !== documentId)
        : [...prevSelected, documentId]
    );
  };

  const handleSelectAll = () => {
    if (selectedDocuments.length === documents.length) {
      setSelectedDocuments([]);
    } else {
      setSelectedDocuments(documents.map((doc) => doc.id));
    }
  };

  const downloadSelectedImages = async () => {
    if (!selectedDocuments.length) return;

    for (const documentId of selectedDocuments) {
      try {
        const response = await fetch(`https://api.seai.co/api/v1/users/${userId}/documents/${documentId}/files`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const imageBlob = await response.blob();
          const document = documents.find((doc) => doc.id === documentId);
          saveAs(imageBlob, `${document.name}.jpg`);
        } else {
          console.error(`Failed to download image for document ${documentId}`);
        }
      } catch (err) {
        console.error('Error downloading document image:', err);
      }
    }
  };

  const navigateToCreateDocument = () => {
    navigate('/documents/create');
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDocumentsPerPageChange = (event) => {
    setDocumentsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = documents.slice(indexOfFirstDocument, indexOfLastDocument);

  const totalPages = Math.ceil(documents.length / documentsPerPage);

  const getVerificationStatus = (expiryDate) => {
    if (!expiryDate) return 'N/A';

    const expiry = new Date(expiryDate);
    const today = new Date();
    const sixMonthsInMs = 6 * 30 * 24 * 60 * 60 * 1000; // Roughly 6 months

    if (today > expiry) {
      const timeSinceExpiry = Math.floor((today - expiry) / (1000 * 60 * 60 * 24)); // Days since expiry
      return `Expired ${timeSinceExpiry} day(s) ago`;
    } else if (expiry - today <= sixMonthsInMs) {
      const timeToExpiry = Math.floor((expiry - today) / (1000 * 60 * 60 * 24)); // Days to expiry
      return `Expiring in ${timeToExpiry} day(s)`;
    } else {
      const timeToExpiry = Math.floor((expiry - today) / (1000 * 60 * 60 * 24)); // Days to expiry
      return `Valid for ${timeToExpiry} day(s)`;
    }
  };

  const handleRowClick = (documentId) => {
    navigate(`/documents/${documentId}/update`);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="documents-container">
      <h1>Documents</h1>
      <div className="document-buttons">
        <button onClick={downloadSelectedImages} className="btn-download-selected" disabled={!selectedDocuments.length}>
          Download Selected
        </button>
        <button onClick={navigateToCreateDocument} className="btn-create-document">
          Create Document
        </button>
      </div>

      <div className="documents-table-container">
        <table className="documents-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedDocuments.length === documents.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th>Preview</th>
              <th>Name</th>
              <th>Number</th>
              <th>Issue Date</th>
              <th>Expiry Date</th>
              <th>Verification Status</th>
            </tr>
          </thead>
          <tbody>
            {currentDocuments.map((document) => (
              <tr key={document.id} className="document-row" onClick={() => handleRowClick(document.id)}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedDocuments.includes(document.id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleSelectDocument(document.id);
                    }}
                  />
                </td>
                <td>
                  {documentImages[document.id] ? (
                    <img
                      src={documentImages[document.id]}
                      alt={document.name}
                      className="document-preview"
                    />
                  ) : (
                    <p>Loading...</p>
                  )}
                </td>
                <td>{document.name}</td>
                <td>{document.number}</td>
                <td>{new Date(document.issueDate).toLocaleDateString()}</td>
                <td>{document.expiryDate ? new Date(document.expiryDate).toLocaleDateString() : 'N/A'}</td>
                <td>{getVerificationStatus(document.expiryDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="documents-cards-container">
        {currentDocuments.map((document) => (
          <div key={document.id} className="document-card">
            <div className="document-card-item">
              {documentImages[document.id] ? (
                <img
                  src={documentImages[document.id]}
                  alt={document.name}
                  className="document-card-preview"
                />
              ) : (
                <p>Loading...</p>
              )}
            </div>
            <div className="document-card-item">
              <span className="document-card-label">Name:</span>
              <span className="document-card-value">{document.name}</span>
            </div>
            <div className="document-card-item">
              <span className="document-card-label">Number:</span>
              <span className="document-card-value">{document.number}</span>
            </div>
            <div className="document-card-item">
              <span className="document-card-label">Issue Date:</span>
              <span className="document-card-value">{new Date(document.issueDate).toLocaleDateString()}</span>
            </div>
            <div className="document-card-item">
              <span className="document-card-label">Expiry Date:</span>
              <span className="document-card-value">{document.expiryDate ? new Date(document.expiryDate).toLocaleDateString() : 'N/A'}</span>
            </div>
            <div className="document-card-item">
              <span className="document-card-label">Verification Status:</span>
              <span className="document-card-value">{getVerificationStatus(document.expiryDate)}</span>
            </div>
            <div className="document-card-item">
              <button
                onClick={() => handleSelectDocument(document.id)}
                className={`document-card-select-btn ${selectedDocuments.includes(document.id) ? 'selected' : ''}`}
              >
                {selectedDocuments.includes(document.id) ? 'Deselect' : 'Select'}
              </button>
            </div>
            <div className="document-card-item">
              <button
                onClick={() => navigate(`/documents/${document.id}/update`)}
                className="document-card-edit-btn"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination-container">
        <select value={documentsPerPage} onChange={handleDocumentsPerPageChange} className="documents-per-page">
          <option value="10">10 Documents | Page</option>
          <option value="25">25 Documents | Page</option>
          <option value="50">50 Documents | Page</option>
        </select>
        <div className="pagination">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Documents;
