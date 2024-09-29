import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const AssignResources = () => {
    const [employees, setEmployees] = useState([]);
    const [machines, setMachines] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [selectedMachine, setSelectedMachine] = useState('');
    const [, setSelectedMachineName] = useState(''); 

    useEffect(() => {
        const fetchEmployees = async () => {
            const employeeSnapshot = await getDocs(collection(db, 'employees'));
            setEmployees(employeeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };

        const fetchMachines = async () => {
            const machineSnapshot = await getDocs(collection(db, 'machines'));
            setMachines(machineSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };

        fetchEmployees();
        fetchMachines();
    }, []);

    const handleAssignMachine = async () => {
        if (!selectedEmployee || !selectedMachine) {
            alert('Por favor selecciona un empleado y una máquina.');
            return;
        }
    
        const machineToAssign = machines.find(machine => machine.id === selectedMachine);
        
        if (machineToAssign.quantity <= 0) {
            alert('No hay máquinas disponibles para asignar.');
            return;
        }
    
        const machineRef = doc(db, 'machines', selectedMachine);
        await updateDoc(machineRef, {
            assignedEmployee: selectedEmployee,
            quantity: machineToAssign.quantity - 1 
        });
    
        const employeeRef = doc(db, 'employees', selectedEmployee);
        await updateDoc(employeeRef, {
            assignedMachine: machineToAssign.name 
        });
    
        alert('Máquina asignada exitosamente.');
        setSelectedEmployee('');
        setSelectedMachine('');
    };

    return (
        <div className="assign-resources">
            <header>
                <h2 className='h2-list'>Asignar Recursos</h2>
            </header><br/><br/>
            <div className="assign-form">
                <label className='label-employee'>Selecciona un empleado:</label>
                <select value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)}>
                    <option value="">Selecciona un empleado</option>
                    {employees.map((employee) => (
                        <option key={employee.id} value={employee.id}>{employee.name}</option> 
                    ))}
                </select><br/><br/>

                <label className='label-machine'>Selecciona una máquina:</label>
                <select value={selectedMachine} onChange={(e) => {
                    const machine = machines.find(machine => machine.id === e.target.value);
                    setSelectedMachine(e.target.value);
                    setSelectedMachineName(machine ? machine.name : ''); 
                }}>
                    <option value="">Selecciona una máquina</option>
                    {machines
                        .filter(machine => machine.status === 'Disponible')
                        .map((machine) => (
                            <option key={machine.id} value={machine.id}>{machine.name}</option>
                        ))}
                </select><br/><br/>

                <button onClick={handleAssignMachine}>Asignar Máquina</button>
            </div>
        </div>
    );
};

export default AssignResources;
