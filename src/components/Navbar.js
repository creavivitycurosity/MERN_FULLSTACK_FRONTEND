// frontend/src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/');
    };

    return (
        <div className={styles.navbar}>
            <div className={styles.logo} onClick={() => navigate('/')}>MyApp</div>
            {username && (

            <div className={styles.logo} ><Link to='./dashboard' style={{ textDecoration: "none", color: "white" }}>DashBoard</Link></div>
            )}
            <div className={styles.authOptions}>


                {username && (
                    <>

                        <span className={styles.username}>{username} <b>- </b></span>
                        <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
                    </>
                ) }




            </div>

        </div>
    );
};

export default Navbar;
