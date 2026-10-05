import Header from './components/Header';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import ThemeToggle from './components/ThemeToggle';

function App() {

    return (
        <div className="app">

            <ThemeToggle />

            <Header />

            <StudentForm />

            <StudentList />

        </div>
    );
}

export default App;
