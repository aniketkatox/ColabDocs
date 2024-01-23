import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginStatusCheck = async () => {
    try {
      const response = await axios.get('http://localhost:3001/users/check-login');
      setIsLoggedIn(response.data.isLoggedIn);
      if(isLoggedIn){
        navigate('/document-directory');
      }
    } catch (error) {
      setIsLoggedIn(false);
      console.error('Error checking login status:', error);
    }
    // try {
    //   const response = await axios.get('http://localhost:3001/users/check-login',{ withCredentials: true });
    //   // console.log("mujhe dekh idhr",response.data.isLoggedIn)
    //   console.log("mujhe dekh idhr",response.data.Login)
    //   setIsLoggedIn(response.data.isLoggedIn);
    //   console.log('isLoggedIn in handleLoginStatusCheck:', response.data.isLoggedIn);
    // } catch (error) {
    //   console.error('Error checking login status:', error);
    // }
  };
  
  useEffect(() => {
    handleLoginStatusCheck();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3001/users/signin', formData, {withCredentials: true,});
      console.log("response data",response.data)
      const { token } = response.data;
      Cookies.set('sessionToken', token);
      console.log('Login successful!');
  
      // Check login status again after successful login
      await handleLoginStatusCheck();
  
      // Log the value of isLoggedIn
      console.log('isLoggedIn:', isLoggedIn);
  
      // Redirect only if login is successful
      if (isLoggedIn) {
        navigate('/document-directory');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };
  

  // useEffect(() => {
  //   // Redirect only if login is successful
  //   console.log("hahaha",isLoggedIn);
  //   if (isLoggedIn) {
  //     navigate('/document-directory');
  //   }
  // }, [isLoggedIn, navigate]);


  return (
    <div>
      {isLoggedIn ? (
        <h2>You are already logged in.</h2>
      ) : (
        <>
          <h2>Sign in</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Email:
              <input type="email" name="email" onChange={handleInputChange} />
            </label>
            <label>
              Password:
              <input type="password" name="password" onChange={handleInputChange} />
            </label>
            <button type="submit">Signin</button>
          </form>
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </>
      )}
    </div>
  );
};

export default Signin;
