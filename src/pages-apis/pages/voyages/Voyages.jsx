import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Voyages = () => {
  const [voyages, setVoyages] = useState([]);
  const { userId, accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVoyages = async () => {
      if (!userId || !accessToken) {
        return;
      }

      try {
        const response = await fetch(`https://api.seai.co/api/v1/users/${userId}/voyages`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setVoyages(data);
        }
      } catch (err) {
        console.error('Error fetching voyages:', err);
      }
    };

    fetchVoyages();
  }, [userId, accessToken]);

  const handleEdit = (voyage) => {
    navigate(`/voyages/${voyage.id}/edit`, { state: { voyage } });
  };

  const handleAddNewVoyage = () => {
    navigate('/voyages/create');
  };

  return (
    <div>
      <h2>Voyages</h2>
      <button onClick={handleAddNewVoyage} style={{ marginBottom: '10px' }}>Add New Voyage</button>
      <table>
        <thead>
          <tr>
            <th>Vessel Name</th>
            <th>Vessel Type</th>
            <th>Rank</th>
            <th>IMO Number</th>
            <th>Joining Port</th>
            <th>Joining Date</th>
            <th>Leaving Port</th>
            <th>Leaving Date</th>
            <th>Remarks</th>
            <th>Flag</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {voyages.map((voyage) => (
            <tr key={voyage.id}>
              <td>{voyage.vesselName}</td>
              <td>{voyage.vesselType}</td>
              <td>{voyage.rank}</td>
              <td>{voyage.imoNumber}</td>
              <td>{voyage.joiningPort}</td>
              <td>{new Date(voyage.joiningDate).toLocaleDateString()}</td>
              <td>{voyage.leavingPort}</td>
              <td>{voyage.leavingDate ? new Date(voyage.leavingDate).toLocaleDateString() : 'N/A'}</td>
              <td>{voyage.remarks}</td>
              <td>{voyage.flag}</td>
              <td>
                <button onClick={() => handleEdit(voyage)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Voyages;
