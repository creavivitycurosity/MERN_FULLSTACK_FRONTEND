// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import UserForm from './components/UserForm';
import Navbar from './components/Navbar';

const App = () => {

    return (
        <Router>
          <Navbar/>

            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add-user" element={<UserForm />} />
                <Route path="/edit-user/:id" element={<UserForm />} />
            </Routes>
        </Router>
    );
};

export default App;


// npm install cross-env --save-dev