import React, { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { vesselTypeOptions, rankOptions } from '../../constants';
import jsPDF from 'jspdf';
import Loading from '../../components-redo/Loading';

const Profile = () => {
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
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const fileInputRef = useRef(null);
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

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
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

      navigate('/'); // Navigate back to the profile page after updating
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://api.seai.co/api/v1/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete user data');
      }

      // Assuming that after deletion, you would redirect to the homepage or login page
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.text('User Profile', 10, 10);
    doc.text(`First Name: ${userData.firstName}`, 10, 20);
    doc.text(`Last Name: ${userData.lastName}`, 10, 30);
    doc.text(`Date of Birth: ${new Date(userData.dateOfBirth).toLocaleDateString()}`, 10, 40);
    doc.text(`Phone: ${userData.phone}`, 10, 50);
    doc.text(`Email: ${userData.email}`, 10, 60);
    doc.text(`Home Airport: ${userData.homeAirport}`, 10, 70);
    doc.text(`Readiness Date: ${new Date(userData.readinessDate).toLocaleDateString()}`, 10, 80);
    doc.text(`Contract Duration: ${userData.contractDuration} months`, 10, 90);
    doc.text(`Rank: ${userData.rank}`, 10, 100);
    doc.text(`Vessel Type: ${userData.vesselType}`, 10, 110);
    doc.text(`Status: ${userData.status}`, 10, 120);
    doc.text(`Present Employer: ${userData.presentEmployer}`, 10, 130);
    doc.text(`Manning Agents: ${userData.manningAgents}`, 10, 140);

    doc.save(`Profile - ${userData.firstName} ${userData.lastName}`);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='profile-body'>
      <form onSubmit={handleSubmit}>
        <div className="personal-information">
          <h2>Personal Information <i className="fa-solid fa-user"></i></h2>

          {/* Profile Picture Upload */}
          <div className="image-preview-container">
            {imagePreview ? (
              <>
                <img src={imagePreview} alt="Profile Preview" className="image-preview" />
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="change-image-button"
                >
                  <i className="fas fa-camera"></i> Change Photo
                </button>
              </>
            ) : (
              <div className="profile-image-upload-placeholder" onClick={() => fileInputRef.current.click()}>
                <i className="fa-solid fa-upload upload-icon"></i>&nbsp;<h3>Upload Photo</h3>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </div>

          {/* Other Personal Information Fields */}
          <div className="form-group-inline">
            <div>
              <label htmlFor="firstName">First name:</label>
              <input
                type="text"
                id="first-name"
                name="firstName"
                value={userData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="lastName">Last name:</label>
              <input
                type="text"
                id="last-name"
                name="lastName"
                value={userData.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth:</label>
            <input
              type="date"
              id="dob"
              name="dateOfBirth"
              value={userData.dateOfBirth ? new Date(userData.dateOfBirth).toISOString().split('T')[0] : ''}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group-inline">
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                disabled
              />
            </div>
            <div>
              <label htmlFor="phone">Phone number:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="homeAirport">Home airport:</label>
            <input
              type="text"
              id="home-airport"
              name="homeAirport"
              value={userData.homeAirport}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="additional-information">
          <h2>Additional Information <i className="fa-solid fa-circle-info"></i></h2>

          <div className="form-group-inline">
            <div>
              <label htmlFor="readinessDate">Readiness date:</label>
              <input
                type="date"
                id="readiness-date"
                name="readinessDate"
                value={userData.readinessDate ? new Date(userData.readinessDate).toISOString().split('T')[0] : ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="contractDuration">Contract duration (months):</label>
              <input
                type="number"
                id="contract-duration"
                name="contractDuration"
                value={userData.contractDuration}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group-inline">
            <div>
              <label htmlFor="rank">Rank:</label>
              <select
                id="rank"
                name="rank"
                value={userData.rank}
                onChange={handleInputChange}
              >
                {Object.keys(rankOptions).map((role) => (
                  <option key={rankOptions[role]} value={rankOptions[role]}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="vesselType">Vessel type:</label>
              <select
                id="vessel-type"
                name="vesselType"
                value={userData.vesselType}
                onChange={handleInputChange}
              >
                {Object.keys(vesselTypeOptions).map((type) => (
                  <option key={vesselTypeOptions[type]} value={vesselTypeOptions[type]}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="status">Status:</label>
              <select
                id="status"
                name="status"
                value={userData.status}
                onChange={handleInputChange}
              >
                <option value="HOME">Home</option>
                <option value="ONBOARD">On Board</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="presentEmployer">Present employer:</label>
            <input
              type="text"
              id="employer"
              name="presentEmployer"
              value={userData.presentEmployer}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="manningAgents">Manning agents:</label>
            <input
              type="text"
              id="manning-agents"
              name="manningAgents"
              value={userData.manningAgents}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="buttons">
          <button type="submit" className="btn btn-update"><i className="fa-solid fa-pen-to-square"></i> Update</button>
          <button type="button" onClick={handleDelete} className="btn btn-delete"><i className="fa-solid fa-delete-left"></i> Delete</button>
          <button type="button" onClick={handleDownloadPDF} className="btn btn-download"><i className="fa-solid fa-file-arrow-down"></i> Download</button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
