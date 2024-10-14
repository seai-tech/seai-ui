import React, { useState, useEffect } from 'react';

function TCApiCredentials() {
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
      <h3>Training Center ID : {userId}</h3>
      <h3>Access Token : {accessToken}</h3>
    </div>
  );
}

export default TCApiCredentials;
