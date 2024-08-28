import React, { useState, useEffect } from 'react';

function Home() {
    const [userId, setUserId] = useState(null);
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        const storedAccessToken = localStorage.getItem('accessToken');
        setUserId(storedUserId);
        setAccessToken(storedAccessToken)
    }, []);

  return (
    <div>
      <h2>Home Page</h2>
      <h3>UserID : {userId}</h3>
      <h3>Access Token : {accessToken}</h3>
      <p>Welcome to the home page!</p>
    </div>
  );
}

export default Home;
