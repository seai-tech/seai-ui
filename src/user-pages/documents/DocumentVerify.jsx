import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { saveAs } from 'file-saver';
import Loading from '../../components/Loading';

const DocumentVerify = () => {
  const { documentId } = useParams();
  const { userId, accessToken } = useContext(AuthContext);
  const [document, setDocument] = useState({
    name: '',
    number: '',
    issueDate: '',
    expiryDate: '',
  });
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
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
          setDocument({
            name: data.name,
            number: data.number,
            issueDate: data.issueDate,
            expiryDate: data.expiryDate,
          });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDocument({
      ...document,
      [name]: value,
    });
  };

  const handleVerify = async () => {
    try {
      // Update document with verified status set to true
      const updatedDocument = { ...document, verified: true };
      const response = await fetch(`https://api.seai.co/api/v1/users/${userId}/documents/${documentId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDocument),
      });

      if (response.ok) {
        navigate(`/documents`); // Navigate to DocumentUpdate after verification
      } else {
        setError('Failed to verify document');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Error verifying document:', err);
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

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="document-update-container">
      <h1>Verify Document</h1>
      <div className="document-data-section">
        <div className="image-container">
          {imageUrl && (
            <div>
              <img src={imageUrl} alt="Document" />
            </div>
          )}
          <button onClick={() => fileInputRef.current.click()}>
            <i className="fas fa-camera"></i> Change Photo
          </button>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                uploadImage(e.target.files[0]);
              }
            }}
          />
        </div>
        <div className="form-container">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={document.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Number:
            <input
              type="text"
              name="number"
              value={document.number}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Issue Date:
            <input
              type="date"
              name="issueDate"
              value={document.issueDate.split('T')[0]}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Expiry Date:
            <input
              type="date"
              name="expiryDate"
              value={document.expiryDate?.split('T')[0] || ''}
              onChange={handleInputChange}
            />
          </label>

          <div className="buttons-container">
            <button className="button-update" onClick={handleVerify}>
              <i className="fa-solid fa-check"></i> Verify
            </button>
            <button className="button-delete" onClick={handleDeleteDocument}>
              <i className="fa-solid fa-times"></i> Discard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentVerify;
