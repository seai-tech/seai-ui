import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const CreateDocument = () => {
  const { userId, accessToken } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
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
      verified: true, // Assuming verified is always true upon creation
    };

    try {
      // First, create the document without the image
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
        const documentId = document.id; // Assuming the response includes the new document's ID

        // Now, upload the image
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
          // After successful creation and image upload, navigate to the documents page
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
    <div>
      <h2>Create New Document</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
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
        <div>
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
        <div>
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
        <div>
          <label>
            Expiry Date:
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Image:
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Document'}
        </button>
      </form>
    </div>
  );
};

export default CreateDocument;
