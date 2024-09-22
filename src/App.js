import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import './styles.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/employees" element={<EmployeeList />} />
                <Route path="/add" element={<AddEmployee />} />
            </Routes>
        </Router>
    );
};

export default App;
