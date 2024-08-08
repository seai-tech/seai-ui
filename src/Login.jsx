// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        setLoading(false);

        if (response.ok) {
          console.log('Login successful', data);
          // Store the token in local storage
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('userId', data.userId);


          navigate('/');
        } else {
          setError(data.message || 'Login failed');
        }
      } catch (err) {
        setLoading(false);
        setError('An error occurred. Please try again.');
        console.error('Error logging in:', err);
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
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>Login</button>
      </form>
    </div>
  );
};

export default Login;
