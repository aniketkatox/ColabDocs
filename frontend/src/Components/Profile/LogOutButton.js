import axios from 'axios';

function LogOutButton({ props}) {
    
    async function logOut(){
        try {
            await axios.post(props.backendURI + '/users/logout', {}, { withCredentials: true })
            .then(response => {
                if (response.status === 200) {
                    props.changeIsLoggedIn(false);
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