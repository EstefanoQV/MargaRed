import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; // Importar la base de datos
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

        // Cleanup the listener on unmount
        return () => unsubscribe();
    }, []);

    return (
        <div>
            <h2>Lista de Empleados</h2>
            <ul>
                {employees.map((employee) => (
                    <li key={employee.id}>
                        {employee.name} - {employee.position}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeList;
