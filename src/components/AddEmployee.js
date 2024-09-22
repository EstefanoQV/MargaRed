import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import '../styles.css';

const AddEmployee = () => {
    const [dni, setDni] = useState('');
    const [name, setName] = useState('');
    const [entryDate] = useState(new Date().toISOString().split('T')[0]); // Fecha de ingreso automática
    const [workerType, setWorkerType] = useState('');
    const [position, setPosition] = useState('');
    const [area, setArea] = useState('');

    const handleAddEmployee = async (e) => {
        e.preventDefault();
        if (!/^\d{8}$/.test(dni)) {
            alert('El DNI debe tener 8 dígitos.');
            return;
        }
        try {
            await addDoc(collection(db, 'employees'), {
                dni,
                name,
                entryDate,
                workerType,
                position,
                area
            });
            setDni('');
            setName('');
            setWorkerType('');
            setPosition('');
            setArea('');
            alert('Empleado agregado');
        } catch (error) {
            console.error('Error al agregar empleado: ', error);
        }
    };

    return (
        <form onSubmit={handleAddEmployee} className="add-employee-form">
            <input
                type="text"
                placeholder="DNI"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Nombre del empleado"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="date"
                value={entryDate}
                readOnly
            />
            <input
                type="text"
                placeholder="Tipo de trabajador"
                value={workerType}
                onChange={(e) => setWorkerType(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Cargo"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Área"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                required
            />
            <button type="submit">Agregar Empleado</button>
        </form>
    );
};

export default AddEmployee;
