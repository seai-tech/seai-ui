import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { vesselTypeOptions, rankOptions } from '../../constants';

const CreateVoyage = () => {
  const { userId, accessToken } = useContext(AuthContext);
  const [vesselName, setVesselName] = useState('');
  const [vesselType, setVesselType] = useState('');
  const [rank, setRank] = useState('');
  const [imoNumber, setImoNumber] = useState('');
  const [joiningPort, setJoiningPort] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [leavingPort, setLeavingPort] = useState('');
  const [leavingDate, setLeavingDate] = useState('');
  const [remarks, setRemarks] = useState('');
  const [flag, setFlag] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const formatDateForAPI = (date) => {
    const dt = new Date(date);
    return dt.toISOString();  // Converts to ISO 8601 format: "YYYY-MM-DDTHH:MM:SS.sssZ"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (imoNumber.length < 7) {
      setError('IMO Number must be at least 7 digits long.');
      setLoading(false);
      return;
    }

    const voyageData = {
      vesselName,
      vesselType: vesselTypeOptions[vesselType],
      rank: rankOptions[rank],
      imoNumber,
      joiningPort,
      joiningDate: formatDateForAPI(joiningDate),
      leavingPort,
      leavingDate: leavingDate ? formatDateForAPI(leavingDate) : null,
      remarks,
      flag,
    };

    console.log('Voyage Data being sent:', JSON.stringify(voyageData, null, 2));

    try {
      const response = await fetch(`https://api.seai.co/api/v1/users/${userId}/voyages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(voyageData),
      });

      if (response.ok) {
        navigate('/voyages');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to create voyage');
        console.error('Error response from API:', errorData);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Error creating voyage:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add New Voyage</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Vessel Name:
            <input
              type="text"
              value={vesselName}
              onChange={(e) => setVesselName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Vessel Type:
            <select value={vesselType} onChange={(e) => setVesselType(e.target.value)} required>
              <option value="">Select Vessel Type</option>
              {Object.keys(vesselTypeOptions).map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Rank:
            <select value={rank} onChange={(e) => setRank(e.target.value)} required>
              <option value="">Select Rank</option>
              {Object.keys(rankOptions).map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            IMO Number:
            <input
              type="text"
              value={imoNumber}
              onChange={(e) => setImoNumber(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Joining Port:
            <input
              type="text"
              value={joiningPort}
              onChange={(e) => setJoiningPort(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Joining Date:
            <input
              type="date"
              value={joiningDate}
              onChange={(e) => setJoiningDate(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Leaving Port:
            <input
              type="text"
              value={leavingPort}
              onChange={(e) => setLeavingPort(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Leaving Date:
            <input
              type="date"
              value={leavingDate}
              onChange={(e) => setLeavingDate(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Remarks:
            <input
              type="text"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Flag:
            <input
              type="text"
              value={flag}
              onChange={(e) => setFlag(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Voyage'}
        </button>
      </form>
    </div>
  );
};

export default CreateVoyage;
