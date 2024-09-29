import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import EmployeeList from './components/EmployeeList';
import MachineList from './components/MachineList';
import Dashboard from './components/Dashboard';
import AssignResources from './components/AssignResources';
import './styles.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/employees" element={<EmployeeList />} />
                <Route path="/machines" element={<MachineList />} />
                <Route path="/assign-resources" element={<AssignResources />} />
            </Routes>
        </Router>
    );
};

export default App;
