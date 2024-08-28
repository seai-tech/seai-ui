import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { saveAs } from 'file-saver';

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [documentImages, setDocumentImages] = useState({});
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Documents</h2>
      <button onClick={downloadSelectedImages} disabled={!selectedDocuments.length}>
        Download Selected
      </button>
      <button onClick={navigateToCreateDocument}>
        Create Document
      </button>
      <table>
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
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((document) => (
            <tr key={document.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedDocuments.includes(document.id)}
                  onChange={() => handleSelectDocument(document.id)}
                />
              </td>
              <td>
                {documentImages[document.id] ? (
                  <img
                    src={documentImages[document.id]}
                    alt={document.name}
                    style={{ width: '50px', height: '50px' }}
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
              <td>
                <Link to={`/documents/${document.id}`}>View Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Documents;
