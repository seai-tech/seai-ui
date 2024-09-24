import React, { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const CreateDocument = () => {
  const { userId, accessToken } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !number || !issueDate || !image) {
      setError('Please fill in all required fields and upload an image.');
      setLoading(false);
      return;
    }

    const documentData = {
      name,
      number,
      issueDate,
      expiryDate,
      verified: true,
    };

    try {
      const documentResponse = await fetch(`https://api.seai.co/api/v1/users/${userId}/documents`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(documentData),
      });

      if (documentResponse.ok) {
        const document = await documentResponse.json();
        const documentId = document.id;

        const formData = new FormData();
        formData.append('file', image);

        const imageResponse = await fetch(`https://api.seai.co/api/v1/users/${userId}/documents/${documentId}/files`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
          body: formData,
        });

        if (imageResponse.ok) {
          navigate('/documents');
        } else {
          setError('Failed to upload image');
        }
      } else {
        setError('Failed to create document');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Error creating document:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-document-container">
      <h1>Create Document</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} className="create-document-form">
        <div className="form-group">
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Number:
            <input
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Issue Date:
            <input
              type="date"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Expiry Date:
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </label>
        </div>

        <div className="form-group">
          <label>Image:</label>
          {!imagePreview && (
            <div className="image-upload-placeholder" onClick={() => fileInputRef.current.click()}>
              <i className="fa-solid fa-upload upload-icon"></i>&nbsp;<h2 className="upload-text">Upload Image</h2>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                style={{ display: 'none' }}
                required
              />
            </div>
          )}

          {imagePreview && (
            <div className="image-preview-container">
              <img src={imagePreview} alt="Preview" className="image-preview" />
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="change-image-button"
              >
                <i className="fas fa-camera"></i> Change Image
              </button>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </div>
          )}
        </div>

        <button type="submit" disabled={loading} className="btn-create-one-document">
          {loading ? 'Creating...' : 'Create Document'}
        </button>
      </form>
    </div>
  );
};

export default CreateDocument;
