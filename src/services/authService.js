import axios from 'axios';

const login = async (credentials) => {
    const response = await axios.post('http://localhost:3001/api/auth/login', credentials);
    return response.data;
};

const logout = async () => {
    localStorage.removeItem('user');
    return { success: true };
};

export default { login, logout };
