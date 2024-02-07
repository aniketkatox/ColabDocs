import LogInForm from "./LogInForm";
import React, { useState } from 'react';
import SignUpForm from "./SignUpForm";
import axios from 'axios';
import { useEffect } from 'react';
import LogOutButton from "./Profile/LogOutButton";
import Documents from "./Profile/DocumentDirectory/Documents";
import Profile from "./Profile/Profile";

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

    var props = {
        backendURI,
        changeIsLoggedIn
    }

    if(isLoggedIn){
        return(
            <div id="main">
                <Profile props = { props }/>
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