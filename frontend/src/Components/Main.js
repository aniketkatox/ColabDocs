import LogInForm from "./LogInForm";
import React, { useState } from 'react';
import SignUpForm from "./SignUpForm";
import axios from 'axios';
import { useEffect } from 'react';
import LogOutButton from "./LogOutButton";

export default function Main() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showSignUpForm, setShowSignUpForm] = useState(false);
    const backendURI = "http://localhost:3001";

    function changeIsLoggedIn(isLoggedIn){
        setIsLoggedIn(isLoggedIn);
    }

    function changeShowSignUpForm(showSignUpForm){
        setShowSignUpForm(showSignUpForm);
    }

    async function checkLogin(){
        try {
            await axios.get( backendURI + '/users/check-login', {withCredentials: true})
            .then(response => {
                if (response.status === 200) {
                    changeIsLoggedIn(true);
                }else{
                    changeIsLoggedIn(false);
                }
            }).catch(error => {
                console.error('Error:', error);
            });
        } catch (error) {
            setIsLoggedIn(false);
            console.error('Error checking login status:', error);
        }
    }

    useEffect(() => {
        checkLogin();
    }, []);

    if(isLoggedIn){
        return(
            <div id="main">
                <h1>Hello logged In!</h1>
                <LogOutButton backendURI = { backendURI } changeIsLoggedIn = { changeIsLoggedIn }></LogOutButton>
            </div>
        )
    }else if(showSignUpForm){
        return(
            <div id="main">
                <SignUpForm changeShowSignUpForm = { changeShowSignUpForm } backendURI = { backendURI }/>
            </div>
        )
    }else{
        return(
            <div id="main">
                <LogInForm changeIsLoggedIn = { changeIsLoggedIn } changeShowSignUpForm = { changeShowSignUpForm } backendURI = { backendURI }></LogInForm>
            </div>
        )
    }
}