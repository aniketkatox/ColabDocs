import axios from 'axios';

function LogOutButton({ backendURI, changeIsLoggedIn}) {
    
    async function logOut(){
        try {
            await axios.post(backendURI + '/users/logout', {}, { withCredentials: true })
            .then(response => {
                if (response.status === 200) {
                    changeIsLoggedIn(false);
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

    return(
        <button onClick={ logOut } >LogOut</button>
    )
}

export default LogOutButton;