import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import '../styles.css';

const MachineModal = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(0);

    const handleAddMachine = async (e) => {
        e.preventDefault();
        if (quantity <= 0) {
            alert('Por favor, ingresa una cantidad válida.');
            return;
        }
        try {
            await addDoc(collection(db, 'machines'), {
                name,
                quantity, 
                status: 'Disponible', 
            });
            setName('');
            setQuantity(0); // Reiniciar cantidad
            alert('Maquinaria agregada');
            onClose();
        } catch (error) {
            console.error('Error al agregar maquinaria: ', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="h2-new-machine">Nueva Maquinaria</h2>
                <form onSubmit={handleAddMachine}>
                    <div className="input-group">
                        <label className="label-add-name">Nombre de la maquinaria:</label>
                        <input
                            className="input-name"
                            type="text"
                            placeholder="Nombre de la maquinaria"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        /><br/><br/>
                    </div>
                    <div className="input-group">
                        <label className="label-add-quantity">Cantidad:</label>
                        <input
                            className="input-quantity"
                            type="number"
                            placeholder="Cantidad"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
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

export default MachineModal;
