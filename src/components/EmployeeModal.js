import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import '../styles.css';

const EmployeeModal = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');
    const [alias, setAlias] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [entryDate] = useState(new Date().toISOString().split('T')[0]); // Fecha de ingreso automática
    const [workerType, setWorkerType] = useState('');
    const [position, setPosition] = useState('');
    const [area, setArea] = useState('');
    const [dni, setDni] = useState('');

    const handleAddEmployee = async (e) => {
        e.preventDefault();
        if (!/^\d{8}$/.test(dni)) {
            alert('El DNI debe tener 8 dígitos.');
            return;
        }
        try {
            await addDoc(collection(db, 'employees'), {
                dni,
                address,
                phone,
                email,
                alias,
                name,
                entryDate,
                workerType,
                position,
                area
            });
            setDni('');
            setAddress('');
            setEmail('');
            setPhone('');
            setAlias('');
            setName('');
            setWorkerType('');
            setPosition('');
            setArea('');
            alert('Empleado agregado');
            onClose(); 
        } catch (error) {
            console.error('Error al agregar empleado: ', error);
        }
    };

    if (!isOpen) return null; 

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className='h2-new-employee'>Nuevo Empleado</h2>
                <form onSubmit={handleAddEmployee}>
                    <div className="input-group"> 
                    <label className="label-add-date">Fecha:</label>
                        <p className="display-date"> {/* Cambio de div a p para mostrar solo texto */}
                            {entryDate}
                        </p>
                    </div>  
                    <div className="input-group">
                        <label className="label-add-name">Nombres/Apellidos:</label>
                        <input
                            className="input-name"
                            type="text"
                            placeholder="Nombre del empleado"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        /><br/><br/>
                    </div>
                    <div className="input-group">
                        <label className="label-add-alias">Alias:</label>
                        <input
                            className="input-alias"
                            type="text"
                            placeholder="Alias"
                            value={alias}
                            onChange={(e) => setAlias(e.target.value)}
                            required
                        /><br/><br/>
                    </div>
                    <div className="input-group">
                        <label className="label-add-address">Dirección/Domicilio:</label>
                        <input
                            className="input-address"
                            type="text"
                            placeholder="Dirección"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        /><br/><br/>
                    </div>
                    <div className="input-group">
                        <label className="label-add-phone">Teléfono:</label>
                        <input
                            className="input-phone"
                            type="text"
                            placeholder="Teléfono"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        /><br/><br/>
                    </div>
                    <div className="input-group">
                        <label className="label-add-email">Correo:</label>
                        <input
                            className="input-email"
                            type="text"
                            placeholder="Correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        /><br/><br/>
                    </div>
                    <div className="input-group">
                        <label className="label-add-dni">DNI:</label>
                        <input
                            className="input-dni"
                            type="text"
                            placeholder="DNI"
                            value={dni}
                            onChange={(e) => setDni(e.target.value)}
                            required
                        /><br/><br/>
                    </div>
                    <div className="input-group">
                        <label className="label-add-workerType">Tipo de trabajador:</label>
                        <input
                            className="input-workerType"
                            type="text"
                            placeholder="Tipo de trabajador"
                            value={workerType}
                            onChange={(e) => setWorkerType(e.target.value)}
                            required
                        /><br/><br/>
                    </div>
                    <div className="button-group">
                    <button onClick={onClose} className="button-cancel">Cancelar</button>
                    <button type="submit">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeModal;
