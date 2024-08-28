import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { saveAs } from 'file-saver';

const DocumentDetails = () => {
  const { documentId } = useParams();
  const { userId, accessToken } = useContext(AuthContext);
  const [document, setDocument] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocumentDetails = async () => {
      if (!userId || !accessToken) {
        setError('User ID or Access Token is missing');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://api.seai.co/api/v1/users/${userId}/documents/${documentId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setDocument(data);

          const imageResponse = await fetchDocumentImage(userId, documentId);
          if (imageResponse) {
            setImageUrl(imageResponse);
          }
        } else {
          setError('Failed to fetch document details');
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
        console.error('Error fetching document details:', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchDocumentImage = async (userId, documentId) => {
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
          return URL.createObjectURL(imageBlob);
        } else {
          console.error('Failed to fetch document image');
          return null;
        }
      } catch (err) {
        console.error('Error fetching document image:', err);
        return null;
      }
    };

    fetchDocumentDetails();
  }, [userId, accessToken, documentId]);

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

  const downloadImage = async () => {
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
        saveAs(imageBlob, `${document.name}.jpg`); // Use the file-saver to download the image
      } else {
        console.error('Failed to download document image');
      }
    } catch (err) {
      console.error('Error downloading document image:', err);
    }
  };

  const handleDeleteDocument = async () => {
    try {
      const response = await fetch(`https://api.seai.co/api/v1/users/${userId}/documents/${documentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        navigate('/documents');
      } else {
        setError('Failed to delete document');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Error deleting document:', err);
    }
  };

  const navigateToUpdate = () => {
    navigate(`/documents/${documentId}/edit`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!document) {
    return <p>No document found</p>;
  }

  return (
    <div>
      <h2>Document Details</h2>
      <p><strong>Name:</strong> {document.name}</p>
      <p><strong>Number:</strong> {document.number}</p>
      <p><strong>Issue Date:</strong> {new Date(document.issueDate).toLocaleDateString()}</p>
      <p><strong>Expiry Date:</strong> {document.expiryDate ? new Date(document.expiryDate).toLocaleDateString() : 'N/A'}</p>
      <p><strong>Status:</strong> {getVerificationStatus(document.expiryDate)}</p>
      {imageUrl && (
        <div>
          <img src={imageUrl} alt="Document" style={{ maxWidth: '100%', height: 'auto' }} />
          <button onClick={downloadImage}>Download Image</button>
        </div>
      )}
      <div>
        <button onClick={navigateToUpdate}>Update</button>
        <button onClick={handleDeleteDocument}>Delete</button>
        {/* <button onClick={handleDeleteImage}>Delete Image</button> */}
      </div>
    </div>
  );
};

export default DocumentDetails;
