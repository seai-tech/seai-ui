import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
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
      const response = await fetch('https://api.seai.co/api/v1/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/login');
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
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {loading && <p>Loading...</p>}
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </div>
        <div>
          <label>First Name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required />
        </div>

        <div>
          <input
            type="checkbox"
            name="gdprAccepted"
            checked={formData.gdprAccepted}
            onChange={handleInputChange}
          />
          <label>I have read and accept the <a href="https://app.seai.co/assets/assets/gdpr.bc1effe864ae8eaf453c51a451fb1aee.pdf?platform=web&hash=bc1effe864ae8eaf453c51a451fb1aee" target="_blank" rel="noopener noreferrer">GDPR policy</a></label>
        </div>
        <button type="submit" disabled={loading}>Register</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
};

export default Register;
