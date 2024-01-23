// Signup.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/users/signup', formData);
      const user = response.data.user;
      localStorage.setItem('user', JSON.stringify(user));
      console.log('User registered successfully!');
      // Redirect to the login page after successful signup
      navigate('/signin');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div>
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" onChange={handleInputChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" onChange={handleInputChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" onChange={handleInputChange} />
        </label>
        <button type="submit">Signup</button>
      </form>
      <p>
        Already have an account? <Link to="/signin">Sign in</Link>
      </p>
    </div>
  );
};

export default Signup;

