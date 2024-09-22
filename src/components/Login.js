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
        <div className="login-page">
            <div className="login-content">
                <div className="login-image">
                    <img src="login.png" alt="Imagen de login" />
                </div>
                <div className="login-container">
                    <div className="login-group">
                        <h2 className="h2-login">
                            INICIAR SESIÓN EN <span className="h2-login1">MARGARED</span>
                        </h2>
                        <h2 className="h2-completa">COMPLETA LOS SIGUIENTES CAMPOS POR FAVOR</h2>
                    </div>
                    <form onSubmit={handleLogin} className="login-form">
                        <label>Usuario</label>
                        <input
                            className="input-user"
                            type="text"
                            placeholder="Usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        /><br/>
                        <label>Contraseña</label>
                        <input
                            className="input-password"
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        /><br/>
                        <button className="ingresar-button" type="submit">Entrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
