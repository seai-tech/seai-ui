import React, { useState, useEffect, useContext } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { vesselTypeOptions, rankOptions } from '../../constants';


const VoyageUpdate = () => {
  const { voyageId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { voyage } = location.state || {};
  const { userId, accessToken } = useContext(AuthContext);
  const [voyageData, setVoyageData] = useState({
    vesselName: voyage?.vesselName || '',
    vesselType: Object.keys(vesselTypeOptions).find(key => vesselTypeOptions[key] === voyage?.vesselType) || '',
    rank: Object.keys(rankOptions).find(key => rankOptions[key] === voyage?.rank) || '',
    imoNumber: voyage?.imoNumber || '',
    joiningPort: voyage?.joiningPort || '',
    joiningDate: voyage?.joiningDate?.split('T')[0] || '',
    leavingPort: voyage?.leavingPort || '',
    leavingDate: voyage?.leavingDate ? voyage.leavingDate.split('T')[0] : '',
    remarks: voyage?.remarks || '',
    flag: voyage?.flag || '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!voyage) {
      setError('No voyage data available');
    }
  }, [voyage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVoyageData({
      ...voyageData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const updatedVoyage = {
        ...voyageData,
        vesselType: vesselTypeOptions[voyageData.vesselType],
        rank: rankOptions[voyageData.rank],
        joiningDate: new Date(voyageData.joiningDate).toISOString(),
        leavingDate: voyageData.leavingDate ? new Date(voyageData.leavingDate).toISOString() : null,
      };

      const response = await fetch(`https://api.seai.co/api/v1/users/${userId}/voyages/${voyageId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedVoyage),
      });

      if (response.ok) {
        navigate('/voyages');
      } else {
        setError('Failed to update voyage');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Error updating voyage:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.seai.co/api/v1/users/${userId}/voyages/${voyageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        navigate('/voyages');
      } else {
        setError('Failed to delete voyage');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Error deleting voyage:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!voyage) {
    return <p>Loading voyage data...</p>;
  }

  return (
    <div>
      <h2>Edit Voyage</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form>
        <div>
          <label>
            Vessel Name:
            <input
              type="text"
              name="vesselName"
              value={voyageData.vesselName}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Vessel Type:
            <select name="vesselType" value={voyageData.vesselType} onChange={handleInputChange} required>
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
            <select name="rank" value={voyageData.rank} onChange={handleInputChange} required>
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
              name="imoNumber"
              value={voyageData.imoNumber}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Joining Port:
            <input
              type="text"
              name="joiningPort"
              value={voyageData.joiningPort}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Joining Date:
            <input
              type="date"
              name="joiningDate"
              value={voyageData.joiningDate}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Leaving Port:
            <input
              type="text"
              name="leavingPort"
              value={voyageData.leavingPort}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Leaving Date:
            <input
              type="date"
              name="leavingDate"
              value={voyageData.leavingDate}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Remarks:
            <input
              type="text"
              name="remarks"
              value={voyageData.remarks}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Flag:
            <input
              type="text"
              name="flag"
              value={voyageData.flag}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <button type="button" onClick={handleUpdate} disabled={loading}>
          {loading ? 'Updating...' : 'Update Voyage'}
        </button>
        <button type="button" onClick={handleDelete} disabled={loading}>
          {loading ? 'Deleting...' : 'Delete Voyage'}
        </button>
      </form>
    </div>
  );
};

export default VoyageUpdate;
