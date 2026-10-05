import { useContext } from 'react';
import { StudentContext } from '../context/StudentContext';

const Header = () => {

    const {
        students,
        clearAllStudents
    } = useContext(StudentContext);


    const getToday = () => {

        const today = new Date();

        return today.toISOString().split('T')[0];
    };


    const today = getToday();


    // Today's attendance
    const markedStudents = students.filter(
        (student) =>
            student.attendance &&
            student.attendance[today] !== undefined
    );


    const presentCount = students.filter(
        (student) =>
            student.attendance &&
            student.attendance[today] === true
    ).length;


    const absentCount = markedStudents.length - presentCount;


    const attendancePercentage =
        markedStudents.length === 0
            ? 0
            : Math.round(
                (presentCount / markedStudents.length) * 100
            );


    const handleClearAll = () => {

        const confirmation = window.confirm(
            'Are you sure you want to delete all students?'
        );

        if (confirmation) {
            clearAllStudents();
        }
    };


    return (
        <header className="header">

            <div>
                <h1>Student Attendance</h1>

                <p>
                    Today: {today}
                </p>
            </div>


            <div className="stats">

                <div className="stat">
                    <strong>
                        {students.length}
                    </strong>

                    <span>
                        Total Students
                    </span>
                </div>


                <div className="stat">
                    <strong>
                        {presentCount}
                    </strong>

                    <span>
                        Present
                    </span>
                </div>


                <div className="stat">
                    <strong>
                        {absentCount}
                    </strong>

                    <span>
                        Absent
                    </span>
                </div>


                <div className="stat">
                    <strong>
                        {attendancePercentage}%
                    </strong>

                    <span>
                        Today
                    </span>
                </div>

            </div>


            <button
                className="clear-button"
                onClick={handleClearAll}
            >
                Clear All Students
            </button>

        </header>
    );
};

export default Header;