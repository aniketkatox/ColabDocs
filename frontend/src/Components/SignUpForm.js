import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SignUpForm({ changeShowSignUpForm, backendURI }){
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });


    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(backendURI + '/users/signup', formData).then(response => {
                if (response.status === 201) {
                    alert("SignUp Success, Please login!");
                    changeShowSignUpForm(false);
                }else{
                    alert("SignUp Failed, Please try again!");
                }
            }).catch(error => {
                console.error('Error:', error);
            });
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <div id="signUpForm">
            <h2>Sign up</h2>
            <form onSubmit={ handleSubmit }>
                <label>
                    Username:
                    <input type="text" name="username" onChange={ handleInputChange } />
                </label>
                <br/>
                <label>
                    Email:
                    <input type="email" name="email" onChange={ handleInputChange } />
                </label>
                <br/>
                <label>
                    Password:
                    <input type="password" name="password" onChange={handleInputChange} />
                </label>
                <br/>
                <button type="submit">Signup</button>
            </form>
        </div>
    );
}

export default SignUpForm;