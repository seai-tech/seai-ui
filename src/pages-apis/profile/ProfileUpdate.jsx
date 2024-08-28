import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { vesselTypeOptions, rankOptions } from '../../constants';

const ProfileUpdate = () => {
  const { userId, accessToken, email } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phone: '',
    homeAirport: '',
    readinessDate: '',
    contractDuration: 0,
    rank: '',
    vesselType: '',
    status: '',
    presentEmployer: '',
    manningAgents: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
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
        setUserData({ ...data, email });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, accessToken, email]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...userData,
      dateOfBirth: new Date(userData.dateOfBirth).toISOString(),
      readinessDate: new Date(userData.readinessDate).toISOString(),
    };

    try {
      const response = await fetch(`https://api.seai.co/api/v1/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to update user data');
      }

      navigate('/profile'); // Navigate back to the profile page after updating
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First name:</label>
        <input type="text" name="firstName" id="firstName" value={userData.firstName} onChange={handleInputChange} />
      </div>

      <div>
        <label htmlFor="lastName">Last name:</label>
        <input type="text" id="lastName" name="lastName" value={userData.lastName} onChange={handleInputChange} />
      </div>

      <div>
        <label htmlFor="dateOfBirth">Date of Birth:</label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={userData.dateOfBirth ? new Date(userData.dateOfBirth).toISOString().split('T')[0] : ''}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="phone">Phone number:</label>
        <input type="tel" id="phone" name="phone" value={userData.phone} onChange={handleInputChange} />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={userData.email} disabled /> {/* Disabled email field */}
      </div>

      <div>
        <label htmlFor="homeAirport">Home airport:</label>
        <input type="text" id="homeAirport" name="homeAirport" value={userData.homeAirport} onChange={handleInputChange} />
      </div>

      <div>
        <label htmlFor="readinessDate">Readiness date:</label>
        <input
          type="date"
          id="readinessDate"
          name="readinessDate"
          value={userData.readinessDate ? new Date(userData.readinessDate).toISOString().split('T')[0] : ''}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="contractDuration">Contract duration (months):</label>
        <input type="number" id="contractDuration" name="contractDuration" value={userData.contractDuration} onChange={handleInputChange} />
      </div>

      <div>
        <label htmlFor="rank">Rank:</label>
        <select id="rank" name="rank" value={userData.rank} onChange={handleInputChange}>
          {Object.keys(rankOptions).map((role) => (
            <option key={rankOptions[role]} value={rankOptions[role]}>
              {role}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="vesselType">Vessel type:</label>
        <select id="vesselType" name="vesselType" value={userData.vesselType} onChange={handleInputChange}>
          {Object.keys(vesselTypeOptions).map((type) => (
            <option key={vesselTypeOptions[type]} value={vesselTypeOptions[type]}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="status">Status:</label>
        <select id="status" name="status" value={userData.status} onChange={handleInputChange}>
          <option value="HOME">Home</option>
          <option value="ONBOARD">On Board</option>
        </select>
      </div>

      <div>
        <label htmlFor="presentEmployer">Present employer:</label>
        <input type="text" id="presentEmployer" name="presentEmployer" value={userData.presentEmployer} onChange={handleInputChange} />
      </div>

      <div>
        <label htmlFor="manningAgents">Manning agents:</label>
        <input type="text" id="manningAgents" name="manningAgents" value={userData.manningAgents} onChange={handleInputChange} />
      </div>

      <div>
        <button type="submit">Update</button>
        <button type="button" onClick={() => navigate('/profile')}>Cancel</button>
      </div>
    </form>
  );
};

export default ProfileUpdate;
