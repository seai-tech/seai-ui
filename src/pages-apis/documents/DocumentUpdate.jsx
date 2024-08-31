import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { saveAs } from 'file-saver';
import Loading from '../../components-redo/Loading';

const DocumentUpdate = () => {
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

  const handleUpdate = async () => {
    try {
      const verified = calculateVerificationStatus(document.expiryDate);

      const response = await fetch(`https://api.seai.co/api/v1/users/${userId}/documents/${documentId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...document, verified }),
      });

      if (response.ok) {
        navigate(`/documents/${documentId}/update`);
      } else {
        setError('Failed to update document');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Error updating document:', err);
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`https://api.seai.co/api/v1/users/${userId}/documents/${documentId}/files`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        const imageUrl = URL.createObjectURL(file);
        setImageUrl(imageUrl);
      } else {
        console.error('Failed to upload image');
      }
    } catch (err) {
      console.error('Error uploading image:', err);
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
        saveAs(imageBlob, `${document.name}.jpg`);
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

  const calculateVerificationStatus = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    return expiry > today;
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (

    <div className="document-update-container">
      <h1>Document №{document.number}</h1>
      <div className="document-data-section">
        <div className="image-container">
          {imageUrl && (
            <div>
              <img
                src={imageUrl}
                alt="Document"
              />
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
            <button className="button-update" onClick={handleUpdate}><i className="fa-solid fa-pen-to-square"></i> Update</button>
            <button className="button-delete" onClick={handleDeleteDocument}><i className="fa-solid fa-delete-left"></i> Delete</button>
            <button className="button-download" onClick={downloadImage}><i className="fa-solid fa-file-arrow-down"></i> Download</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpdate;
