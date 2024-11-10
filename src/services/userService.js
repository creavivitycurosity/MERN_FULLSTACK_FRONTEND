import axios from 'axios';

const getUsers = async () => {
    const response = await axios.get('http://localhost:3001/api/users');
    return response.data;
};

const getUser  = async (id) => {
    const response = await axios.get(`http://localhost:3001/api/users/${id}`);
    return response.data;
};

const addUser  = async (user) => {
    const response = await axios.post('http://localhost:3001/api/users', user);
    return response.data;
};

const updateUser  = async (id, user) => {
    const response = await axios.put(`http://localhost:3001/api/users/${id}`, user);
    return response.data;
};

const deleteUser  = async (id) => {
    const response = await axios.delete(`http://localhost:3001/api/users/${id}`);
    return response.data;
};

export default { getUsers, getUser , addUser , updateUser , deleteUser  };