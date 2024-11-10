
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate instead of useHistory
import userService from '../services/userService';
import styles from './UserForm.module.css';

const UserForm = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Use useNavigate instead of useHistory
    const [user, setUser ] = useState({
        f_Name: '',
        f_Email: '',
        f_Mobile: '',
        f_Designation: '',
        f_gender: '',
        f_Course: '',
        image: null, // Add image state
    });

    useEffect(() => {
        if (id) {
            const fetchUser  = async () => {
                const fetchedUser  = await userService.getUser (id);
                setUser (fetchedUser );
            };
            fetchUser ();
        }
    }, [id]);

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setUser ({ ...user, image: e.target.files[0] }); // Handle image file
        } else {
            setUser ({ ...user, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('f_Name', user.f_Name);
        formData.append('f_Email', user.f_Email);
        formData.append('f_Mobile', user.f_Mobile);
        formData.append('f_Designation', user.f_Designation);
        formData.append('f_gender', user.f_gender);
        formData.append('f_Course', user.f_Course);
        if (user.image) {
            formData.append('image', user.image); // Append the image file
        }

        if (id) {
            await userService.updateUser (id, formData); // Pass FormData
        } else {
            await userService.addUser (formData); // Pass FormData
        }
        navigate('/dashboard');
    };

    return (
        <div className={styles.container}>
            <h2>{id ? "Edit User" : "Add User"}</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input name="f_Name" placeholder="Name" value={user.f_Name} onChange={handleChange} required className={styles.input} />
                <input name="f_Email" placeholder="Email" value={user.f_Email} onChange={handleChange} required className={styles.input} />
                <input name="f_Mobile" placeholder="Mobile" value={user.f_Mobile} onChange={handleChange} required className={styles.input} />
                <input name="f_Designation" placeholder="Designation" value={user.f_Designation} onChange={handleChange} className={styles.input} />
                <input name="f_gender" placeholder="Gender" value={user.f_gender} onChange={handleChange} className={styles.input} />
                <input name="f_Course" placeholder="Course" value={user.f_Course} onChange={handleChange} className={styles.input} />
                <input type="file"   name="image" onChange={handleChange} className={styles.fileInput} />
                <button type="submit" className={styles.button}>{id ? "Update" : "Add"} User</button>
            </form>
        </div>
    );
};

export default UserForm;