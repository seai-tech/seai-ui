import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Loading from '../../components/Loading';

const CourseUpdate = () => {
  const { courseId } = useParams();
  const { userId, accessToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    price: '',
    currency: 'BGN',
    maxSeats: '',
    description: '',
    isPublished: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`https://api.seai.co/api/v1/${userId}/courses/${courseId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCourseData({
            ...data,
            startDate: data.startDate.split('T')[0],
            endDate: data.endDate.split('T')[0],
            startTime: data.startTime,
            endTime: data.endTime,
            price: data.price.toString(),
            maxSeats: data.maxSeats.toString(),
            isPublished: data.isPublished,
          });
        } else {
          setError('Failed to fetch course details.');
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
        console.error('Error fetching course details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, userId, accessToken]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCourseData({
      ...courseData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const updatedCourse = {
        ...courseData,
        startDate: new Date(courseData.startDate).toISOString(),
        endDate: new Date(courseData.endDate).toISOString(),
        price: parseFloat(courseData.price),
        maxSeats: parseInt(courseData.maxSeats),
      };

      const response = await fetch(`https://api.seai.co/api/v1/${userId}/courses/${courseId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCourse),
      });

      if (response.ok) {
        navigate('/courses');
      } else {
        setError('Failed to update course.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Error updating course:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.seai.co/api/v1/${userId}/courses/${courseId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        navigate('/courses');
      } else {
        setError('Failed to delete course.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Error deleting course:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="course-update-container">
      <h1>Course Update</h1>
      {error && <p className="error-message">{error}</p>}
      <form className="course-update-form">
        <div className="form-group">
          <label>Course Name:</label>
          <input
            type="text"
            name="name"
            value={courseData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={courseData.startDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={courseData.endDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Start Time:</label>
          <input
            type="time"
            name="startTime"
            value={courseData.startTime}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>End Time:</label>
          <input
            type="time"
            name="endTime"
            value={courseData.endTime}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={courseData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Max Seats:</label>
          <input
            type="number"
            name="maxSeats"
            value={courseData.maxSeats}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Currency:</label>
          <select name="currency" value={courseData.currency} onChange={handleInputChange}>
            <option value="BGN">BGN</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={courseData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Publish:</label>
          <input
            type="checkbox"
            name="isPublished"
            checked={courseData.isPublished}
            onChange={handleInputChange}
          />
        </div>
        <div className="buttons-container">
          <button type="button" className="btn-update" onClick={handleUpdate}>
            <i className="fa-solid fa-pen-to-square"></i> Update
          </button>
          <button type="button" className="btn-delete" onClick={handleDelete}>
            <i className="fa-solid fa-delete-left"></i> Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseUpdate;
