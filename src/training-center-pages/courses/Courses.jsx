import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Loading from '../../components/Loading';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { accessToken, userId } = useContext(AuthContext);
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`https://api.seai.co/api/v1/training-centers/${userId}/courses`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }

        const data = await response.json();

        const updatedCourses = await Promise.all(
          data.map(async (course) => {
            const attendeeCount = await getAttendeeCount(userId, course.id, accessToken);
            return { ...course, attendeeCount };
          })
        );

        setCourses(updatedCourses);
        setFilteredCourses(updatedCourses);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCourses();
  }, [accessToken, userId]);

  const getAttendeeCount = async (userId, courseId, accessToken) => {
    try {
      const response = await fetch(`https://api.seai.co/training-centers/${userId}/courses/${courseId}/attendees`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch attendees');
      }

      const attendees = await response.json();
      const attendeeCount = attendees.filter((attendee) => !attendee.isWaiting).length;

      return attendeeCount;
    } catch (err) {
      console.error('Error fetching attendees:', err);
      return 0;
    }
  };

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

  const togglePublish = async (courseId, isPublished, e) => {
    e.stopPropagation();
    try {
      const courseResponse = await fetch(`https://api.seai.co/api/v1/${userId}/courses/${courseId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!courseResponse.ok) {
        throw new Error('Failed to fetch the course data');
      }

      const courseData = await courseResponse.json();

      const attendeeCount = await getAttendeeCount(userId, courseId, accessToken);

      const updatedCourse = {
        ...courseData,
        isPublished: !isPublished,
        startDate: new Date(courseData.startDate).toISOString(),
        endDate: new Date(courseData.endDate).toISOString(),
        price: parseFloat(courseData.price),
        maxSeats: parseInt(courseData.maxSeats),
        attendeeCount,
      };

      const updateResponse = await fetch(`https://api.seai.co/api/v1/${userId}/courses/${courseId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCourse),
      });

      if (updateResponse.ok) {
        const updatedCourses = courses.map((course) =>
          course.id === courseId ? { ...course, isPublished: !isPublished, attendeeCount } : course
        );
        setCourses(updatedCourses);
        applyFilter(filter);
      } else {
        throw new Error('Failed to update course publishing status');
      }
    } catch (err) {
      console.error('Failed to toggle publish status', err);
    }
  };

  const applyFilter = (filter) => {
    setFilter(filter);
    switch (filter) {
      case 'published':
        setFilteredCourses(courses.filter((course) => course.isPublished));
        break;
      case 'waitlist':
        setFilteredCourses(courses.filter((course) => !course.isPublished));
        break;
      default:
        setFilteredCourses(courses);
    }
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
      <div className="course-add-and-filter">
        <button onClick={handleAddNewCourse} className="btn-add-course"><i className="fa-solid fa-plus"></i> Add Course</button>
        <div className="filter-buttons">
          <h2>Filter:</h2>
          <button onClick={() => applyFilter('all')} className="btn-filter">All Courses</button>
          <button onClick={() => applyFilter('published')} className="btn-filter">Published</button>
          <button onClick={() => applyFilter('waitlist')} className="btn-filter">Waitlist</button>
        </div>
      </div>

      <div className="course-list">
        {filteredCourses.map((course) => (
          <div className="course-item" key={course.id} onClick={() => handleAttendees(course.id, course.name)}>
            <div className="course-header">
              <span>{course.name}</span>
              <div className="course-quick-actions" onClick={(e) => e.stopPropagation()}>
                <span>{course.attendeeCount} / {course.maxSeats} <i className="fa-solid fa-users"></i></span>
                <button onClick={(e) => togglePublish(course.id, course.isPublished, e)} className="btn-publish">
                  {course.isPublished ? 'Hide' : 'Publish'}
                </button>
                <span className={`course-icon ${expandedCourse === course.id ? 'rotated' : ''}`} onClick={(e) => { e.stopPropagation(); toggleCourse(course.id); }}>
                  {expandedCourse === course.id ? (
                    <i className="fa-solid fa-angle-up"></i>
                  ) : (
                    <i className="fa-solid fa-angle-down"></i>
                  )}
                </span>
              </div>
            </div>

            <div className={`course-details ${expandedCourse === course.id ? 'expanded' : ''}`}>
              <div className="course-info">
                <p><strong>Start Date:</strong> {new Date(course.startDate).toLocaleDateString()}</p>
                <p><strong>End Date:</strong> {new Date(course.endDate).toLocaleDateString()}</p>
                <p><strong>Start Time:</strong> {course.startTime}</p>
                <p><strong>End Time:</strong> {course.endTime}</p>
                <p><strong>Price:</strong> {course.price} {course.currency}</p>
                <p><strong>Description:</strong> {course.description}</p>
                <p><strong>Maximum Seats:</strong> {course.maxSeats}</p>
                <p><strong>Published:</strong> {course.isPublished ? 'Yes' : 'No'}</p>
              </div>
              <div className="course-actions">
                <button onClick={(e) => { e.stopPropagation(); handleUpdateCourse(course.id); }} className="btn-update">
                  <i className="fa-solid fa-pen-to-square"></i> Update
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;

