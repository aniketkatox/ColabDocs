import axios from 'axios';

export default function LogOutButton({ backendURI, setIsLoggedIn}) {
    
    async function logOut(){
        try {
            await axios.post(backendURI + '/users/logout').then(response => {
                if (response.status === 200) {
                    clearLoginState();
                }else{
                    alert("SignOut Failed, Please try again!");
                }
            }).catch(error => {
                console.error('Error:', error);
            });
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }

    function clearLoginState(){
        setIsLoggedIn(false);
    }

    return(
        <button onClick={ logOut } >LogOut</button>
    )
}