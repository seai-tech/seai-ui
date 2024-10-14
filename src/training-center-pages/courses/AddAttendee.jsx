import React, { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Loading from '../../components/Loading';

const AddAttendee = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telephone: '',
    remark: '',
    isWaiting: true,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { accessToken, userId } = useContext(AuthContext);
  const { courseId } = useParams();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRadioChange = (e) => {
    setFormData({
      ...formData,
      isWaiting: e.target.value === 'waiting',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const requestBody = {
      name: formData.name,
      email: formData.email,
      telephone: formData.telephone,
      remark: formData.remark,
      isWaiting: formData.isWaiting,
    };

    try {
      const response = await fetch(
        `https://api.seai.co/training-centers/${userId}/courses/${courseId}/attendees`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        navigate(`/courses/${courseId}/attendees`);
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to add attendee.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="create-attendee-container">
      <h1>Add Attendee</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} className="create-attendee-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="telephone">Telephone</label>
          <input
            type="text"
            name="telephone"
            value={formData.telephone}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="remark">Remark</label>
          <textarea
            name="remark"
            value={formData.remark}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group radio-group">
          <label>Attendee Status</label>
          <div className="radio-options">
            <label>
              <input
                type="radio"
                name="isWaiting"
                value="waiting"
                checked={formData.isWaiting === true}
                onChange={handleRadioChange}
              />
              Add to Waiting List
            </label>
            <label>
              <input
                type="radio"
                name="isWaiting"
                value="approved"
                checked={formData.isWaiting === false}
                onChange={handleRadioChange}
              />
              Add to Approved List
            </label>
          </div>
        </div>

        <button type="submit" className="btn-create-attendee">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddAttendee;
