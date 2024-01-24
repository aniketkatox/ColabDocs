import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LogInForm({ changeIsLoggedIn, changeShowSignUpForm, backendURI }) {
    const [formData, setFormData] = useState({ email: '', password: '' });    

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post( backendURI + '/users/signin', formData, { withCredentials: true }).then(response => {
                if (response.status === 200) {
                    changeIsLoggedIn(true);
                }else{
                    changeIsLoggedIn(false);
                }
            }).catch(error => {
                console.error('Error:', error);
            });
        } catch (error) {
            console.error('Error', error);
        }
    }

    function showSignUpForm(){
        changeShowSignUpForm(true);
    }

    return (
        <div id="logInForm">
        <h2>SignIn</h2>
            <form onSubmit={ handleSubmit }>
                <label>
                    Email:
                    <input type="email" name="email" onChange={ handleInputChange }/>
                </label>
                <br/>
                <label>
                    Password:
                    <input type="password" name="password" onChange={ handleInputChange }/>
                </label>
                <br/>
                <button type="submit">SignIn</button>
            </form>
          <p>
            Don't have an account? <button onClick={ showSignUpForm }>SignUp</button>
          </p>
        </div>
    )
}

export default LogInForm;