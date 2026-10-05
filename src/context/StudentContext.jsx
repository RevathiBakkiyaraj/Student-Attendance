import { createContext, useEffect, useState } from 'react';

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {

    const [students, setStudents] = useState(() => {

        const savedStudents = localStorage.getItem('students');

        return savedStudents
            ? JSON.parse(savedStudents)
            : [];
    });


    // Save students to localStorage
    useEffect(() => {

        localStorage.setItem(
            'students',
            JSON.stringify(students)
        );

    }, [students]);


    // Add Student
    const addStudent = (name) => {

        const newStudent = {
            id: Date.now(),
            name: name.trim(),
            attendance: {}
        };

        setStudents((prevStudents) => [
            ...prevStudents,
            newStudent
        ]);
    };


    // Edit Student Name
    const editStudent = (id, newName) => {

        setStudents((prevStudents) =>
            prevStudents.map((student) =>
                student.id === id
                    ? {
                        ...student,
                        name: newName.trim()
                    }
                    : student
            )
        );
    };


    // Mark Attendance
    const markAttendance = (id, date, status) => {

        setStudents((prevStudents) =>
            prevStudents.map((student) => {

                if (student.id !== id) {
                    return student;
                }

                return {
                    ...student,

                    attendance: {
                        ...student.attendance,
                        [date]: status
                    }
                };
            })
        );
    };


    // Delete Student
    const deleteStudent = (id) => {

        setStudents((prevStudents) =>
            prevStudents.filter(
                (student) => student.id !== id
            )
        );
    };


    // Clear All Students
    const clearAllStudents = () => {

        setStudents([]);
    };


    return (
        <StudentContext.Provider
            value={{
                students,
                addStudent,
                editStudent,
                markAttendance,
                deleteStudent,
                clearAllStudents
            }}
        >
            {children}
        </StudentContext.Provider>
    );
};