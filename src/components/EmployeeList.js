import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { Helmet } from 'react-helmet';
import EmployeeModal from './EmployeeModal'; // Asegúrate de importar el modal

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

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

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <Helmet>
                <title>Empleados</title>
                <meta name="description" content="Página que muestra la lista de empleados." />
            </Helmet>
            <header>
                <h2 className="h2-list">Lista de Empleados</h2>
            </header>
            <div className="employee-page">
                <div className="button-container">
                    <button className="add-employee-button" onClick={handleOpenModal}>
                        Agregar Empleado
                    </button>
                </div>
                <main>
                    <div className="table-container">
                        <table className="employee-table">
                            <thead>
                                <tr>
                                    <th className="dni-column">DNI</th>
                                    <th className="name-column">Nombre</th>
                                    <th className="date-column">Fecha de Ingreso</th>
                                    <th className="workerType-column">Tipo de Trabajador</th>
                                    <th className="machine-column">Máquina Asignada</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((employee) => (
                                    <tr key={employee.id}>
                                        <td className="dni-column1">{employee.dni}</td>
                                        <td className="name-column1">{employee.name}</td>
                                        <td className="date-column1">{employee.entryDate}</td>
                                        <td className="workerType-column1">{employee.workerType}</td>
                                        <td className="machine-column1">
                                            {employee.assignedMachine ? employee.assignedMachine : ' '}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
            {}
            <EmployeeModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
};

export default EmployeeList;
