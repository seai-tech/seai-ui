import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
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
        const response = await fetch('https://api.seai.co/api/v1/users/authentication', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        setLoading(false);

        if (response.ok) {
          login(data.userId, data.accessToken, email);
        } else if (response.status === 400 && data.message.includes('Email not confirmed')) {
          setError('Please verify your email before logging in.');
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
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
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
      </form>
      {error === 'Please verify your email before logging in.' && (
        <p>
          Didn't receive a verification email? <a href={`/resend-verification?email=${encodeURIComponent(email)}`}>Resend Verification Email</a>
        </p>
      )}
      <p>Don't have an account? <a href="/register">Register</a></p>
    </div>
  );
};

export default Login;
