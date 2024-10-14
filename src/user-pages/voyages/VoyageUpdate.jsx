import React, { useState, useEffect, useContext } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { vesselTypeOptions, rankOptions } from '../../constants';
import Loading from '../../components/Loading';

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

  if (loading) {
    return <Loading />;
  }

  if (!voyage) {
    return <p>Loading voyage data...</p>;
  }

  return (
    <div className="voyage-update-container">
      <h1>Voyage IMO №{voyage.imoNumber}</h1>
      {error && <p className="error-message">{error}</p>}
      <form className="voyage-update-form">
        <div className="form-group">
          <label>Vessel Name:</label>
          <input
            type="text"
            name="vesselName"
            value={voyageData.vesselName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Vessel Type:</label>
          <select name="vesselType" value={voyageData.vesselType} onChange={handleInputChange} required>
            <option value="">Select Vessel Type</option>
            {Object.keys(vesselTypeOptions).map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Rank:</label>
          <select name="rank" value={voyageData.rank} onChange={handleInputChange} required>
            <option value="">Select Rank</option>
            {Object.keys(rankOptions).map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>IMO Number:</label>
          <input
            type="text"
            name="imoNumber"
            value={voyageData.imoNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Joining Port:</label>
          <input
            type="text"
            name="joiningPort"
            value={voyageData.joiningPort}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Joining Date:</label>
          <input
            type="date"
            name="joiningDate"
            value={voyageData.joiningDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Leaving Port:</label>
          <input
            type="text"
            name="leavingPort"
            value={voyageData.leavingPort}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Leaving Date:</label>
          <input
            type="date"
            name="leavingDate"
            value={voyageData.leavingDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Remarks:</label>
          <input
            type="text"
            name="remarks"
            value={voyageData.remarks}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Flag:</label>
          <input
            type="text"
            name="flag"
            value={voyageData.flag}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="buttons-container">
          <button type="button" className="btn-update" onClick={handleUpdate} disabled={loading}>
            <i className="fa-solid fa-pen-to-square"></i> {loading ? 'Updating...' : 'Update'}
          </button>
          <button type="button" className="btn-delete" onClick={handleDelete} disabled={loading}>
            <i className="fa-solid fa-delete-left"></i> {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VoyageUpdate;
