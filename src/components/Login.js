import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        
        if (username === 'admin' && password === 'margared') {
            navigate('/employees'); // Redirige a la lista de empleados
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    };

    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin} className="login-form">
                <input
                    type="text"
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
};

export default Login;
