

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import authService from '../services/authService';
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode
import styles from './Login.module.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await authService.login({ username, password });
            if (response.success) {
                // Store the token in local storage
                localStorage.setItem('token', response.token);

                   // Decode the token to get user information
                   const decodedToken = jwtDecode(response.token);
                   localStorage.setItem('username', decodedToken.username); // Store the username
   
                navigate('/dashboard'); // Use navigate instead of history.push
            } else {
                setError(response.message);
            }
        } catch (err) {
            setError("Login failed. Please try again.");
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleLogin} className={styles.form}>
            <h2>Login</h2>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>Login</button>
            </form>
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
};

export default Login;
