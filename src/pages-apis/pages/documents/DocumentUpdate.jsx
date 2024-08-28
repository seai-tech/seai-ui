import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

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
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

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
        body: JSON.stringify({ ...document, verified }),  // Pass the verified status to the API
      });

      if (response.ok) {
        navigate(`/documents/${documentId}`);
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
        const imageBlob = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        setImageUrl(imageUrl); // Update the state to reflect the new image URL
      } else {
        console.error('Failed to upload image');
      }
    } catch (err) {
      console.error('Error uploading image:', err);
    }
  };

  const calculateVerificationStatus = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    return expiry > today;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Edit Document</h2>
      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={document.name}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Document"
            style={{ maxWidth: '100%', height: 'auto', marginBottom: '10px' }}
          />
        )}
        <button onClick={() => fileInputRef.current.click()}>Change Photo</button>
        <input
          type="file"
          ref={fileInputRef} // Attach ref to file input
          accept="image/*"
          style={{ display: 'none' }} // Hide the file input
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              uploadImage(e.target.files[0]); // Upload image
            }
          }}
        />
      </div>
      <div>
        <button onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
};

export default DocumentUpdate;
