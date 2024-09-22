import React from 'react';
import AddEmployee from './components/AddEmployee';
import EmployeeList from './components/EmployeeList';

const App = () => {
    return (
        <div>
            <h1>Gestión de Empleados</h1>
            <AddEmployee />
            <EmployeeList />
        </div>
    );
};

export default App;
