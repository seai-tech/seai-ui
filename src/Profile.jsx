import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId');
      const accessToken = localStorage.getItem('accessToken');

      if (!userId || !accessToken) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://api.seai.co/api/v1/users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Profile</h1>
      {userData ? (
        <div>
          <p><strong>First Name:</strong> {userData.firstName}</p>
          <p><strong>Last Name:</strong> {userData.lastName}</p>
          <p><strong>Rank:</strong> {userData.rank || 'N/A'}</p>
          <p><strong>Present Employer:</strong> {userData.presentEmployer}</p>
          <p><strong>Date of Birth:</strong> {new Date(userData.dateOfBirth).toLocaleDateString()}</p>
          <p><strong>Manning Agents:</strong> {userData.manningAgents}</p>
          <p><strong>Status:</strong> {userData.status}</p>
          <p><strong>Vessel Type:</strong> {userData.vesselType}</p>
          <p><strong>Home Airport:</strong> {userData.homeAirport}</p>
          <p><strong>Readiness Date:</strong> {new Date(userData.readinessDate).toLocaleDateString()}</p>
          <p><strong>Contract Duration:</strong> {userData.contractDuration} months</p>
          <p><strong>Phone:</strong> {userData.phone}</p>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default Profile;
