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
    <form>
      <div className='personal-information'>
        <h2>Personal Information    <i class="fa-solid fa-user"></i></h2>
        
        <hr />

       <div className='form-group-inline'>
        <div>
          <label htmlFor="first-name">First name:</label>
          <input type="text" name="first-name" id="first-name" value={userData.firstName} readOnly/>
        </div>

        <div>
        <label htmlFor="last-name">Last name:</label>
        <input type="text" id="last-name" name="last-name" value={userData.lastName} readOnly />
        </div>       
       </div>

       <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input type="date" id="dob" name="dob" value={new Date(userData.dateOfBirth).toISOString().split('T')[0]} readOnly />
        </div>

        <div className="form-group-inline">
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={userData.email} readOnly />
          </div>
          <div>
            <label htmlFor="phone">Phone number:</label>
            <input type="tel" id="phone" name="phone" value={userData.phone} readOnly />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="home-airport">Home airport:</label>
          <input type="text" id="home-airport" name="home-airport" value={userData.homeAirport} readOnly />
        </div>
      </div>

      <div className="additional-information">
        <h2>Additional Information   <i class="fa-solid fa-circle-info"></i></h2>
        
        <hr />

        <div className="form-group-inline">
          <div>
            <label htmlFor="readiness-date">Readiness date:</label>
            <input type="date" id="readiness-date" name="readiness-date" value={new Date(userData.readinessDate).toISOString().split('T')[0]} readOnly />
          </div>
          <div>
            <label htmlFor="contract-duration">Contract duration (months):</label>
            <input type="number" id="contract-duration" name="contract-duration" value={userData.contractDuration} readOnly />
          </div>
        </div>

        <div className="form-group-inline">
          <div>
            <label htmlFor="rank">Rank:</label>
            <select id="rank" name="rank" value={userData.rank} disabled>
              <option value="master">Master</option>
              <option value="chief-officer">Chief Officer</option>
            </select>
          </div>
          <div>
            <label htmlFor="vessel-type">Vessel type:</label>
            <select id="vessel-type" name="vessel-type" value={userData.vesselType} disabled>
              <option value="bulk-carrier">Bulk Carrier</option>
              <option value="tanker">Tanker</option>
            </select>
          </div>
          <div>
            <label htmlFor="status">Status:</label>
            <select id="status" name="status" value={userData.status} disabled>
              <option value="home">Home</option>
              <option value="on-board">On Board</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="employer">Present employer:</label>
          <input type="text" id="employer" name="employer" value={userData.presentEmployer} readOnly />
        </div>

        <div className="form-group">
          <label htmlFor="manning-agents">Manning agents:</label>
          <input type="text" id="manning-agents" name="manning-agents" value={userData.manningAgents} readOnly />
        </div>
      </div>

      <div className="buttons">
        <button type="submit" className="btn btn-update">Update</button>
        <button type="button" className="btn btn-delete">Delete</button>
        <button type="button" className="btn btn-download">Download</button>
      </div>
    </form>

  );
};

export default Profile;
