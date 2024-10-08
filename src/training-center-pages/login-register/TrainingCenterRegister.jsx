import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SwipeButtonsRegister from '../../components/SwipeButtonsRegister';

const TrainingCenterRegister = () => {
  const [formData, setFormData] = useState({
    nameOfOrganization: '',
    email: '',
    password: '',
    confirmPassword: '',
    telephone1: '',
    telephone2: '',
    telephone3: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://api.seai.co/api/v1/training-centers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nameOfOrganization: formData.nameOfOrganization,
          email: formData.email,
          password: formData.password,
          telephone1: formData.telephone1,
          telephone2: formData.telephone2,
          telephone3: formData.telephone3,
        }),
      });

      if (response.ok) {
        navigate('/login/training-center');
      } else {
        const data = await response.json();
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-body">
      <SwipeButtonsRegister></SwipeButtonsRegister>
      <form onSubmit={handleSubmit} className="register-form">
        <h1>Training Center Register</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {loading && <p>Loading...</p>}

        <div>
          <label>Name of Organization:</label>
          <input
            type="text"
            name="nameOfOrganization"
            value={formData.nameOfOrganization}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Telephone 1:</label>
          <input
            type="text"
            name="telephone1"
            value={formData.telephone1}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Telephone 2:</label>
          <input
            type="text"
            name="telephone2"
            value={formData.telephone2}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Telephone 3:</label>
          <input
            type="text"
            name="telephone3"
            value={formData.telephone3}
            onChange={handleInputChange}
          />
        </div>

        <div className="gdpr-container">
          <input
            type="checkbox"
            name="gdprAccepted"
            checked={formData.gdprAccepted}
            onChange={handleInputChange}
            id="gdprAccepted"
            className="custom-checkbox"
          />
          <label htmlFor="gdprAccepted">
            I have read and accept the{' '}
            <a
              href="https://app.seai.co/assets/assets/gdpr.bc1effe864ae8eaf453c51a451fb1aee.pdf?platform=web&hash=bc1effe864ae8eaf453c51a451fb1aee"
              target="_blank"
              rel="noopener noreferrer"
            >
              GDPR policy
            </a>
          </label>
        </div>

        <button type="submit" disabled={loading}>
          Register
        </button>
        <p>
          Already have an account? <Link to="/login/training-center">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default TrainingCenterRegister;
