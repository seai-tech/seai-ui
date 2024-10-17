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
    const [editedRemarks, setEditedRemarks] = useState({}); // Store edited remarks here
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
                // Sort attendees alphabetically by name
                const sortedWaitingAttendees = data.filter((attendee) => attendee.isWaiting).sort((a, b) => a.name.localeCompare(b.name));
                const sortedApprovedAttendees = data.filter((attendee) => !attendee.isWaiting).sort((a, b) => a.name.localeCompare(b.name));

                setWaitingAttendees(sortedWaitingAttendees);
                setApprovedAttendees(sortedApprovedAttendees);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchCourseDetails();
        fetchAttendees();
    }, [accessToken, userId, courseId]);

    const handleRemarkChange = (attendeeId, value) => {
        setEditedRemarks((prevRemarks) => ({
            ...prevRemarks,
            [attendeeId]: value,
        }));
    };

    const handleSaveRemark = async (attendeeId) => {
        try {
            const attendee = [...waitingAttendees, ...approvedAttendees].find(
                (attendee) => attendee.id === attendeeId
            );

            const updatedRemark = editedRemarks[attendeeId] || attendee.remark;

            const response = await fetch(`https://api.seai.co/training-centers/${userId}/courses/${courseId}/attendees/${attendeeId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...attendee, // Send all attendee data, including updated remarks
                    remark: updatedRemark,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update remark');
            }

            // Update the UI with the saved remark
            setWaitingAttendees((prev) =>
                prev.map((attendee) =>
                    attendee.id === attendeeId ? { ...attendee, remark: updatedRemark } : attendee
                )
            );
            setApprovedAttendees((prev) =>
                prev.map((attendee) =>
                    attendee.id === attendeeId ? { ...attendee, remark: updatedRemark } : attendee
                )
            );
        } catch (err) {
            setError(err.message);
        }
    };

    const handleApprove = async (attendeeId, isWaiting) => {
        try {
            const attendee = [...waitingAttendees, ...approvedAttendees].find(
                (attendee) => attendee.id === attendeeId
            );

            // Toggle the isWaiting field only
            const response = await fetch(`https://api.seai.co/training-centers/${userId}/courses/${courseId}/attendees/${attendeeId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...attendee,
                    isWaiting: !isWaiting,  // Only change this field
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update attendee');
            }

            // Update UI
            if (isWaiting) {
                // Move attendee from waiting to approved list
                setApprovedAttendees([...approvedAttendees, { ...attendee, isWaiting: false }]);
                setWaitingAttendees(waitingAttendees.filter((attendee) => attendee.id !== attendeeId));
            } else {
                // Move attendee from approved to waiting list
                setWaitingAttendees([...waitingAttendees, { ...attendee, isWaiting: true }]);
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
                                <th>#</th> {/* Row Number Column */}
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Remarks</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {waitingAttendees.length > 0 ? (
                                waitingAttendees.map((attendee, index) => (
                                    <tr key={attendee.id}>
                                        <td>{index + 1}.</td> {/* Display Row Number */}
                                        <td>{attendee.name}</td>
                                        <td>{attendee.email}</td>
                                        <td>{attendee.telephone || 'N/A'}</td>
                                        <td>
                                            <input
                                                className='attendee-remark-input'
                                                type="text"
                                                value={editedRemarks[attendee.id] !== undefined ? editedRemarks[attendee.id] : attendee.remark || ''}
                                                onChange={(e) => handleRemarkChange(attendee.id, e.target.value)}
                                            />
                                        </td>
                                        <td className="attendee-actions">
                                            <button onClick={() => handleSaveRemark(attendee.id)} className="btn-save-remark">
                                                <i className="fa-regular fa-floppy-disk"></i>
                                            </button>

                                            <button onClick={() => handleApprove(attendee.id, attendee.isWaiting)} className="btn-approve">
                                                <i className="fa-solid fa-plus"></i>
                                            </button>

                                            <button onClick={() => handleDelete(attendee.id)} className="btn-delete-attendee">
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">No attendees in the waiting list.</td>
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
                                <th>#</th> {/* Row Number Column */}
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Remarks</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {approvedAttendees.length > 0 ? (
                                approvedAttendees.map((attendee, index) => (
                                    <tr key={attendee.id}>
                                        <td>{index + 1}.</td> {/* Display Row Number */}
                                        <td>{attendee.name}</td>
                                        <td>{attendee.email}</td>
                                        <td>{attendee.telephone || 'N/A'}</td>
                                        <td>
                                            <input
                                                className='attendee-remark-input'
                                                type="text"
                                                value={editedRemarks[attendee.id] !== undefined ? editedRemarks[attendee.id] : attendee.remark || ''}
                                                onChange={(e) => handleRemarkChange(attendee.id, e.target.value)}
                                            />
                                        </td>
                                        <td className="attendee-actions">
                                            <button onClick={() => handleSaveRemark(attendee.id)} className="btn-save-remark">
                                                <i className="fa-regular fa-floppy-disk"></i>
                                            </button>

                                            <button onClick={() => handleApprove(attendee.id, attendee.isWaiting)} className="btn-disapprove">
                                                <i className="fa-solid fa-minus"></i>
                                            </button>

                                            <button onClick={() => handleDelete(attendee.id)} className="btn-delete-attendee">
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">No approved attendees yet.</td>
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
