import React, { useState } from 'react';
import { db } from '../firebase'; // Importar la base de datos
import { collection, addDoc } from 'firebase/firestore';

const AddEmployee = () => {
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');

    const handleAddEmployee = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'employees'), {
                name,
                position
            });
            setName('');
            setPosition('');
            alert('Empleado agregado');
        } catch (error) {
            console.error('Error al agregar empleado: ', error);
        }
    };

    return (
        <form onSubmit={handleAddEmployee}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre del empleado"
                required
            />
            <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="Puesto"
                required
            />
            <button type="submit">Agregar Empleado</button>
        </form>
    );
};

export default AddEmployee;
