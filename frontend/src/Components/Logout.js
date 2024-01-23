import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleLogout = async () => {
    try {
      // Make an HTTP request to the server to logout
      await axios.post('http://localhost:3001/users/logout');
  
      // Clear user data from local storage
      localStorage.removeItem('user');
  
      // Redirect to the login page after logout
      navigate('/signin');
    } catch (error) {
      console.error('Error during logout:', error);
      // Handle error if necessary
    }
  };
  
  return (
    <div>
      <h2>Logout</h2>
      <p>This is the logout page</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
