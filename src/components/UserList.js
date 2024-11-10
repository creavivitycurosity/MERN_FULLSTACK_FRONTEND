import React from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../services/userService';
import styles from './UserList.module.css';

const UserList = ({ users, setUsers }) => {
    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/edit-user/${id}`);
    };

    const handleDelete = async (id) => {
        await userService.deleteUser (id);
        setUsers(users.filter(user => user.f_Id !== id));
    };

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Profile</th> {/* New Image column */}
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Designation</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.f_Id}>
                        <td>
                            {user.f_Image ? (
                                <img 
                                    src={`http://localhost:3001/${user.f_Image}`} // Prepend the server URL
                                    alt={`${user.f_Name}'s avatar`} 
                                    className={styles.userImage} 
                                />
                            ) : (
                                <span>No Image</span> // Placeholder if no image
                            )}
                        </td>
                        <td>{user.f_Name}</td>
                        <td>{user.f_Email}</td>
                        <td>{user.f_Mobile}</td>
                        <td>{user.f_Designation}</td>
                        <td>
                            <button onClick={() => handleEdit(user.f_Id)} className={`${styles.button} ${styles.editButton}`}>Edit</button>
                            <button onClick={() => handleDelete(user.f_Id)} className={`${styles.button} ${styles.deleteButton}`}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UserList;