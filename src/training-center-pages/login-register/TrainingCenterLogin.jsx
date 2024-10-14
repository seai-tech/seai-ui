import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import SwipeButtonsLogin from '../../components/SwipeButtonsLogin';

const TrainingCenterLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/courses');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setError('Both fields are required');
    } else {
      setError('');
      setLoading(true);
      try {
        const response = await fetch('https://api.seai.co/api/v1/training-centers/authentication', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        setLoading(false);

        if (response.ok) {
          login(data.trainingCenterId, data.accessToken, email, 'trainingCenter');
          navigate('/courses')
        } else {
          setError(data.message || 'Login failed');
        }
      } catch (err) {
        setLoading(false);
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="login-body">
      <SwipeButtonsLogin></SwipeButtonsLogin>
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Training Center Login</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {loading && <p>Loading...</p>}
        <div>
          <label>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>Login</button>
        <p>Don't have an account? <Link to="/register/training-center">Register</Link></p>
      </form>
    </div>
  );
};

export default TrainingCenterLogin;
