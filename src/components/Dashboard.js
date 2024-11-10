// frontend/src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import userService from '../services/userService';
import UserList from './UserList';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await userService.getUsers();
            setUsers(data);
        };
        fetchUsers();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username'); // Optionally remove the username

        navigate('/'); // Use navigate instead of history.push
    };
    const username = localStorage.getItem('username');


    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Employees</h2>
                <button onClick={() => navigate('/add-user')} className={styles.button}>Add New Employee</button>
                
            </div>
            <UserList users={users} setUsers={setUsers} />
        </div>
    );
};

export default Dashboard;