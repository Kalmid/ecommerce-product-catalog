//register
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import '../styles.css';

function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', form);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <select name="role" onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <input 
          type="name" 
          name="username" 
          placeholder="Username" 
          onChange={handleChange} required />
          <input 
          name="email" 
          type="email" 
          placeholder="Email" 
          onChange={handleChange} required />
          <input 
          name="password" 
          type="password" 
          placeholder="Password" 
          onChange={handleChange} required />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;





