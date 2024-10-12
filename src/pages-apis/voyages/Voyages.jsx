import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Loading from '../../components-redo/Loading';

const Voyages = () => {
  const [voyages, setVoyages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [voyagesPerPage, setVoyagesPerPage] = useState(10);
  const [loading, setLoading] = useState(true); // Added loading state
  const { userId, accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVoyages = async () => {
      if (!userId || !accessToken) {
        setLoading(false); // Stop loading if user is not authenticated
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
        } else {
          console.error('Failed to fetch voyages');
        }
      } catch (err) {
        console.error('Error fetching voyages:', err);
      } finally {
        setLoading(false); // Stop loading after fetch is complete
      }
    };

    fetchVoyages();
  }, [userId, accessToken]);

  const handleEdit = (voyage) => {
    navigate(`/voyages/${voyage.id}/update`, { state: { voyage } });
  };

  const handleAddNewVoyage = () => {
    navigate('/voyages/create');
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleVoyagesPerPageChange = (event) => {
    setVoyagesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const indexOfLastVoyage = currentPage * voyagesPerPage;
  const indexOfFirstVoyage = indexOfLastVoyage - voyagesPerPage;
  const currentVoyages = voyages.slice(indexOfFirstVoyage, indexOfLastVoyage);

  const totalPages = Math.ceil(voyages.length / voyagesPerPage);

  if (loading) {
    return <Loading />; // Render the Loading component while loading
  }

  return (
    <div className="voyages-container">
      <h1>Voyages</h1>
      <button onClick={handleAddNewVoyage} className="btn btn-add-voyage"><i className="fa-solid fa-plus"></i> Add Voyage</button>

      <div className="voyages-table-container">
        <table className="voyages-table">
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
            </tr>
          </thead>
          <tbody>
            {currentVoyages.map((voyage) => (
              <tr key={voyage.id} onClick={() => handleEdit(voyage)} className="voyage-row">
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="voyages-cards-container">
        {currentVoyages.map((voyage) => (
          <div key={voyage.id} className="voyage-card">
            <div className="voyage-card-item">
              <span className="voyage-card-label">Vessel Name:</span>
              <span className="voyage-card-value">{voyage.vesselName}</span>
            </div>
            <div className="voyage-card-item">
              <span className="voyage-card-label">Vessel Type:</span>
              <span className="voyage-card-value">{voyage.vesselType}</span>
            </div>
            <div className="voyage-card-item">
              <span className="voyage-card-label">Rank:</span>
              <span className="voyage-card-value">{voyage.rank}</span>
            </div>
            <div className="voyage-card-item">
              <span className="voyage-card-label">IMO Number:</span>
              <span className="voyage-card-value">{voyage.imoNumber}</span>
            </div>
            <div className="voyage-card-item">
              <span className="voyage-card-label">Joining Port:</span>
              <span className="voyage-card-value">{voyage.joiningPort}</span>
            </div>
            <div className="voyage-card-item">
              <span className="voyage-card-label">Joining Date:</span>
              <span className="voyage-card-value">{new Date(voyage.joiningDate).toLocaleDateString()}</span>
            </div>
            <div className="voyage-card-item">
              <span className="voyage-card-label">Leaving Port:</span>
              <span className="voyage-card-value">{voyage.leavingPort}</span>
            </div>
            <div className="voyage-card-item">
              <span className="voyage-card-label">Leaving Date:</span>
              <span className="voyage-card-value">{voyage.leavingDate ? new Date(voyage.leavingDate).toLocaleDateString() : 'N/A'}</span>
            </div>
            <div className="voyage-card-item">
              <span className="voyage-card-label">Remarks:</span>
              <span className="voyage-card-value">{voyage.remarks}</span>
            </div>
            <div className="voyage-card-item">
              <span className="voyage-card-label">Flag:</span>
              <span className="voyage-card-value">{voyage.flag}</span>
            </div>
            <button onClick={() => handleEdit(voyage)} className="voyage-card-edit-btn">Update</button>
          </div>
        ))}
      </div>

      <div className="pagination-container">
        <select value={voyagesPerPage} onChange={handleVoyagesPerPageChange} className="voyages-per-page">
          <option value="10">10 Voyages | Page</option>
          <option value="25">25 Voyages | Page</option>
          <option value="50">50 Voyages | Page</option>
        </select>
        <div className="pagination">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Voyages;
