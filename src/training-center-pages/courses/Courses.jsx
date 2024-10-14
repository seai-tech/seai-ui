import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Loading from '../../components/Loading';

const Cources = () => {
  const [courses, setCourses] = useState([]);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { accessToken, userId } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`https://api.seai.co/api/v1/training-centers/${userId}/courses`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }

        const data = await response.json();
        setCourses(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCourses();
  }, [accessToken, userId]);

  const toggleCourse = (courseId) => {
    if (expandedCourse === courseId) {
      setExpandedCourse(null);
    } else {
      setExpandedCourse(null);
      setTimeout(() => setExpandedCourse(courseId), 150);
    }
  };
  const handleUpdateCourse = (courseId) => {
    navigate(`/courses/${courseId}/update`);
  };

  const handleAttendees = (courseId, courseName) => {
    navigate(`/courses/${courseId}/attendees`, { state: { courseName } });
  };

  const handleAddNewCourse = () => {
    navigate('/courses/create');
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="courses-container">
      <h1>Courses</h1>
      <button onClick={handleAddNewCourse} className="btn btn-add-voyage"><i className="fa-solid fa-plus"></i> Add Course</button>
      <div className="course-list">
        {courses.map((course, index) => (
          <div className="course-item" key={index}>
            <div className="course-header" onClick={() => toggleCourse(course.id)}>
              <span>{course.name}</span>
              <span className={`course-icon ${expandedCourse === course.id ? 'rotated' : ''}`}>
                {expandedCourse === course.id ? (
                  <i className="fa-solid fa-angle-up"></i>
                ) : (
                  <i className="fa-solid fa-angle-down"></i>
                )}
              </span>
            </div>
            <div className={`course-details ${expandedCourse === course.id ? 'expanded' : ''}`}>
              <div className="course-info">
                <p><strong>Start Date:</strong> {new Date(course.startDate).toLocaleDateString()}</p>
                <p><strong>End Date:</strong> {new Date(course.endDate).toLocaleDateString()}</p>
                <p><strong>Start Time:</strong> {course.startTime}</p>
                <p><strong>End Time:</strong> {course.endTime}</p>
                <p><strong>Price:</strong> {course.price} {course.currency}</p>
                <p><strong>Description:</strong> {course.description}</p>
                <p><strong>Published:</strong> {course.isPublished ? 'Yes' : 'No'}</p>
              </div>
              <div className="course-actions">
                <button onClick={() => handleUpdateCourse(course.id)} className="btn-update"><i className="fa-solid fa-pen-to-square"></i> Update Information</button>
                <button onClick={() => handleAttendees(course.id, course.name)} className="btn-attendees"><i class="fa-regular fa-calendar"></i> Attendees</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

};

export default Cources;
