import { useContext, useState } from 'react';
import { StudentContext } from '../context/StudentContext';

const StudentForm = () => {

    const [name, setName] = useState('');

    const { addStudent } =
        useContext(StudentContext);


    const handleSubmit = (e) => {

        e.preventDefault();

        if (!name.trim()) {
            return;
        }

        addStudent(name);

        setName('');
    };


    return (
        <form
            className="student-form"
            onSubmit={handleSubmit}
        >

            <input
                type="text"
                placeholder="Enter Student Name"
                value={name}
                onChange={(e) =>
                    setName(e.target.value)
                }
            />

            <button type="submit">
                Add Student
            </button>

        </form>
    );
};

export default StudentForm;