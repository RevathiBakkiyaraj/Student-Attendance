import { useContext, useState } from 'react';
import { StudentContext } from '../context/StudentContext';

const StudentList = () => {

    const {
        students,
        markAttendance,
        deleteStudent,
        editStudent
    } = useContext(StudentContext);


    const getToday = () => {

        const today = new Date();

        return today.toISOString().split('T')[0];
    };


    const [search, setSearch] = useState('');

    const [filter, setFilter] = useState('all');

    const [selectedDate, setSelectedDate] =
        useState(getToday());

    const [editingId, setEditingId] =
        useState(null);

    const [editName, setEditName] =
        useState('');


    // Edit student
    const handleEdit = (student) => {

        setEditingId(student.id);

        setEditName(student.name);
    };


    // Save edited name
    const handleSave = (id) => {

        if (!editName.trim()) {
            return;
        }

        editStudent(id, editName);

        setEditingId(null);

        setEditName('');
    };


    // Filter students
    const filteredStudents = students.filter(
        (student) => {

            const matchesSearch =
                student.name
                    .toLowerCase()
                    .includes(search.toLowerCase());


            const status =
                student.attendance?.[selectedDate];


            const matchesFilter =
                filter === 'all'
                    ? true
                    : filter === 'present'
                        ? status === true
                        : status === false;


            return matchesSearch && matchesFilter;
        }
    );


    // Calculate attendance percentage
    const getAttendancePercentage = (student) => {

        const attendance =
            student.attendance || {};


        const dates =
            Object.keys(attendance);


        if (dates.length === 0) {
            return 0;
        }


        const presentDays =
            Object.values(attendance)
                .filter(
                    (status) => status === true
                )
                .length;


        return Math.round(
            (presentDays / dates.length) * 100
        );
    };


    // Get attendance history
    const getAttendanceHistory = (student) => {

        const attendance =
            student.attendance || {};


        return Object.entries(attendance)
            .sort(
                ([dateA], [dateB]) =>
                    dateB.localeCompare(dateA)
            );
    };


    return (
        <div className="student-section">

            <div className="controls">

                {/* Search */}

                <input
                    type="text"
                    placeholder="Search student..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />


                {/* Date */}

                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) =>
                        setSelectedDate(e.target.value)
                    }
                />


                {/* Filter */}

                <select
                    value={filter}
                    onChange={(e) =>
                        setFilter(e.target.value)
                    }
                >

                    <option value="all">
                        All Students
                    </option>

                    <option value="present">
                        Present
                    </option>

                    <option value="absent">
                        Absent
                    </option>

                </select>

            </div>


            <h2>
                Students - {selectedDate}
            </h2>


            {filteredStudents.length === 0 ? (

                <p className="no-students">
                    No students found.
                </p>

            ) : (

                filteredStudents.map((student) => {

                    const todayStatus =
                        student.attendance?.[
                            selectedDate
                        ];


                    const percentage =
                        getAttendancePercentage(student);


                    const history =
                        getAttendanceHistory(student);


                    return (

                        <div
                            className="student-card"
                            key={student.id}
                        >

                            {/* Student name */}

                            {editingId === student.id ? (

                                <div className="edit-section">

                                    <input
                                        type="text"
                                        value={editName}
                                        onChange={(e) =>
                                            setEditName(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <button
                                        onClick={() =>
                                            handleSave(
                                                student.id
                                            )
                                        }
                                    >
                                        Save
                                    </button>

                                    <button
                                        onClick={() => {
                                            setEditingId(null);
                                            setEditName('');
                                        }}
                                    >
                                        Cancel
                                    </button>

                                </div>

                            ) : (

                                <div className="student-header">

                                    <h3>
                                        {student.name}
                                    </h3>

                                    <button
                                        onClick={() =>
                                            handleEdit(student)
                                        }
                                    >
                                        Edit
                                    </button>

                                </div>
                            )}


                            {/* Today's status */}

                            <div className="current-status">

                                <h4>
                                    Attendance for {selectedDate}
                                </h4>


                                {todayStatus === undefined && (

                                    <p>
                                        Status: Not Marked
                                    </p>
                                )}


                                {todayStatus === true && (

                                    <p className="present">
                                        Status: Present
                                    </p>
                                )}


                                {todayStatus === false && (

                                    <p className="absent">
                                        Status: Absent
                                    </p>
                                )}


                                <div>

                                    <button
                                        className="present-button"
                                        onClick={() =>
                                            markAttendance(
                                                student.id,
                                                selectedDate,
                                                true
                                            )
                                        }
                                    >
                                        ✓ Present
                                    </button>


                                    <button
                                        className="absent-button"
                                        onClick={() =>
                                            markAttendance(
                                                student.id,
                                                selectedDate,
                                                false
                                            )
                                        }
                                    >
                                        ✗ Absent
                                    </button>

                                </div>

                            </div>


                            {/* Percentage */}

                            <div className="percentage">

                                <strong>
                                    Overall Attendance:
                                </strong>

                                <span>
                                    {percentage}%
                                </span>

                            </div>


                            {/* Attendance History */}

                            <div className="history">

                                <h4>
                                    Attendance History
                                </h4>


                                {history.length === 0 ? (

                                    <p>
                                        No attendance history.
                                    </p>

                                ) : (

                                    <table>

                                        <thead>

                                            <tr>
                                                <th>
                                                    Date
                                                </th>

                                                <th>
                                                    Status
                                                </th>
                                            </tr>

                                        </thead>


                                        <tbody>

                                            {history.map(
                                                ([date, status]) => (

                                                    <tr key={date}>

                                                        <td>
                                                            {date}
                                                        </td>

                                                        <td>
                                                            {status
                                                                ? 'Present'
                                                                : 'Absent'}
                                                        </td>

                                                    </tr>
                                                )
                                            )}

                                        </tbody>

                                    </table>
                                )}

                            </div>


                            {/* Delete */}

                            <button
                                className="delete-button"
                                onClick={() =>
                                    deleteStudent(
                                        student.id
                                    )
                                }
                            >
                                Delete Student
                            </button>

                        </div>
                    );
                })
            )}

        </div>
    );
};

export default StudentList;