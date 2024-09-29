import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="dashboard">
            <header>
                <h2 className='h2-list'>Gestión de Recursos</h2>
            </header>
            <div className="button-container-dashboard">
                <button className="nav-button" onClick={() => navigate('/employees')}>
                    Empleados
                    <img src="employee-icon.png" alt="Empleados" className="button-icon" />
                </button>
                <button className="nav-button" onClick={() => navigate('/machines')}>
                    Máquinas
                    <img src="machine-icon.png" alt="Máquinas" className="button-icon" />
                </button>
                <button className="nav-button" onClick={() => navigate('/assign-resources')}>
                    Asignar Recursos
                    <img src="assign-icon.png" alt="Asignar Recursos" className="button-icon" />
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
