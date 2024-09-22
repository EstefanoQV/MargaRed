import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'employees'), (snapshot) => {
            const employeeList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setEmployees(employeeList);
        });
        
        return () => unsubscribe();
    }, []);

    return (
        <div>
            <h2>Lista de Empleados</h2>
            <Link to="/add">
                <button className="add-employee-button">Agregar Empleado</button>
            </Link>
            <table className="employee-table">
                <thead>
                    <tr>
                    <th className="dni-column">DNI</th>
                        <th className="name-column">Nombre</th>
                        <th className="date-column">Fecha de Ingreso</th>
                        <th className="workerType-column">Tipo de Trabajador</th>
                        <th className="position-column">Cargo</th>
                        <th className="area-column">Área</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td className="dni-column1">{employee.dni}</td>
                            <td className="name-column1">{employee.name}</td>
                            <td className="date-column1">{employee.entryDate}</td>
                            <td className="workerType-column1">{employee.workerType}</td>
                            <td className="position-column1">{employee.position}</td>
                            <td className="area-column1">{employee.area}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
