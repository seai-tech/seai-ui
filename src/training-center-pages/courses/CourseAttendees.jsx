import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Loading from '../../components/Loading';

const CourseAttendees = () => {
    const { accessToken, userId } = useContext(AuthContext);
    const { courseId } = useParams();
    const [courseName, setCourseName] = useState('Unknown Course');
    const [waitingAttendees, setWaitingAttendees] = useState([]);
    const [approvedAttendees, setApprovedAttendees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await fetch(`https://api.seai.co/api/v1/${userId}/courses/${courseId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch course details');
                }

                const courseData = await response.json();
                setCourseName(courseData.name);
            } catch (err) {
                setError('Failed to load course details');
            }
        };

        const fetchAttendees = async () => {
            try {
                const response = await fetch(`https://api.seai.co/training-centers/${userId}/courses/${courseId}/attendees`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch attendees');
                }

                const data = await response.json();
                setWaitingAttendees(data.filter((attendee) => attendee.isWaiting));
                setApprovedAttendees(data.filter((attendee) => !attendee.isWaiting));
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchCourseDetails();
        fetchAttendees();
    }, [accessToken, userId, courseId]);

    const handleApprove = async (attendeeId, isWaiting) => {
        try {
            const attendee = [...waitingAttendees, ...approvedAttendees].find(
                (attendee) => attendee.id === attendeeId
            );

            const response = await fetch(`https://api.seai.co/training-centers/${userId}/courses/${courseId}/attendees/${attendeeId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: attendee.name,
                    email: attendee.email,
                    telephone: attendee.telephone,
                    remark: attendee.remark,
                    isWaiting: !isWaiting,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update attendee');
            }

            if (isWaiting) {
                const approved = waitingAttendees.find((attendee) => attendee.id === attendeeId);
                setApprovedAttendees([...approvedAttendees, { ...approved, isWaiting: false }]);
                setWaitingAttendees(waitingAttendees.filter((attendee) => attendee.id !== attendeeId));
            } else {
                const waiting = approvedAttendees.find((attendee) => attendee.id === attendeeId);
                setWaitingAttendees([...waitingAttendees, { ...waiting, isWaiting: true }]);
                setApprovedAttendees(approvedAttendees.filter((attendee) => attendee.id !== attendeeId));
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async (attendeeId) => {
        try {
            const response = await fetch(`https://api.seai.co/training-centers/${userId}/courses/${courseId}/attendees/${attendeeId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete attendee');
            }

            setWaitingAttendees(waitingAttendees.filter((attendee) => attendee.id !== attendeeId));
            setApprovedAttendees(approvedAttendees.filter((attendee) => attendee.id !== attendeeId));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleAddAttendee = () => {
        navigate(`/courses/${courseId}/add-attendee`);
    };

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="attendees-container">
            <h1 className="attendees-title">Attendees of {courseName}</h1>
            <button onClick={handleAddAttendee} className="btn btn-add-attendee"><i className="fa-solid fa-plus"></i> Add Attendee</button>

            <div className="attendee-tables">
                <div className="attendee-table waiting-list-table">
                    <h2 className="attendee-table-title">Waiting List</h2>
                    <table className="attendee-table-content">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Remarks</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {waitingAttendees.length > 0 ? (
                                waitingAttendees.map((attendee) => (
                                    <tr key={attendee.id}>
                                        <td>{attendee.name}</td>
                                        <td>{attendee.email}</td>
                                        <td>{attendee.telephone || 'N/A'}</td>
                                        <td>{attendee.remark || 'N/A'}</td>
                                        <td className="attendee-actions">
                                            <button onClick={() => handleApprove(attendee.id, attendee.isWaiting)} className="btn-approve"><i className="fa-solid fa-plus"></i></button>
                                            <button onClick={() => handleDelete(attendee.id)} className="btn-delete-attendee"><i className="fa-solid fa-trash"></i></button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No attendees in the waiting list.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="attendee-table approved-list-table">
                    <h2 className="attendee-table-title">Approved List</h2>
                    <table className="attendee-table-content">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Remarks</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {approvedAttendees.length > 0 ? (
                                approvedAttendees.map((attendee) => (
                                    <tr key={attendee.id}>
                                        <td>{attendee.name}</td>
                                        <td>{attendee.email}</td>
                                        <td>{attendee.telephone || 'N/A'}</td>
                                        <td>{attendee.remark || 'N/A'}</td>
                                        <td className="attendee-actions">
                                            <button onClick={() => handleApprove(attendee.id, attendee.isWaiting)} className="btn-disapprove"><i className="fa-solid fa-minus"></i></button>
                                            <button onClick={() => handleDelete(attendee.id)} className="btn-delete-attendee"><i className="fa-solid fa-trash"></i></button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No approved attendees yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CourseAttendees;
