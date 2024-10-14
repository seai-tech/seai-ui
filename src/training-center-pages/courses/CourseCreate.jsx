import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Loading from '../../components/Loading';

const CreateCourse = () => {
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    price: '',
    currency: 'BGN',
    maxSeats: '',
    description: '',
    isPublished: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { accessToken, userId } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'startTime' || name === 'endTime') {
      setFormData({
        ...formData,
        [name]: `${value}:00`,
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');


    const requestBody = {
      name: formData.name,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString(),
      startTime: formData.startTime,
      endTime: formData.endTime,
      price: parseFloat(formData.price),
      currency: formData.currency,
      maxSeats: parseInt(formData.maxSeats),
      description: formData.description,
      isPublished: formData.isPublished,
    };

    try {
      const response = await fetch(`https://api.seai.co/api/v1/training-centers/${userId}/courses`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Server Response:', data);
        navigate('/courses');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to create course.');
        console.log('Error Response:', data);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Error creating course:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="create-document-container">
      <h1>Create Course</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} className="create-document-form">
        <div className="form-group">
          <label htmlFor="name">Course Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="startTime">Start Time</label>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleInputChange}
            step="1800"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="endTime">End Time</label>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleInputChange}
            step="1800"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="currency">Currency</label>
          <select name="currency" value={formData.currency} onChange={handleInputChange}>
            <option value="BGN">BGN</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="maxSeats">Max Seats</label>
          <input
            type="number"
            name="maxSeats"
            value={formData.maxSeats}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="isPublished">Publish</label>
          <input
            type="checkbox"
            name="isPublished"
            checked={formData.isPublished}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="btn-create-one-document">Create Course</button>
      </form>
    </div>
  );
};
export default CreateCourse;
