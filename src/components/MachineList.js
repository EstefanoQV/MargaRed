import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { Helmet } from 'react-helmet';
import MachineModal from './MachineModal';

const MachineList = () => {
    const [machines, setMachines] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'machines'), (snapshot) => {
            const machineList = snapshot.docs.map(doc => ({
                id: doc.id, 
                ...doc.data()
            }));
            setMachines(machineList);
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
                <title>Maquinarias</title>
                <meta name="description" content="Página que muestra la lista de maquinarias." />
            </Helmet>
            <header>
                <h2 className="h2-list">Lista de Maquinarias</h2>
            </header>
            <div className="machine-page">
                <div className="button-container">
                    <button className="add-machine-button" onClick={handleOpenModal}>
                        Agregar Maquinaria
                    </button>
                </div>
                <main>
                    <div className="table-container">
                        <table className="machine-table">
                            <thead>
                                <tr>
                                    <th className="name-column">Nombre</th>
                                    <th className="quantity-column">Cantidad Disponible</th>
                                    <th className="status-column">Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {machines.map((machine) => (
                                    <tr key={machine.id}>
                                        <td className="name-column1">{machine.name}</td>
                                        <td className="quantity-column1">{machine.quantity}</td>
                                        <td className="status-column1">{machine.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
            <MachineModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
};

export default MachineList;
