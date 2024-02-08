import Welcome from "./Welcome";
import LogOutButton from "./LogOutButton";
import DocumentDirectory from "./DocumentDirectory/DocumentDirectory";

function Profile({ props }) {

    var logOutButtonProp = {
        backendURI : props.backendURI,
        changeIsLoggedIn : props.changeIsLoggedIn
    }

    var documentDirectoryProp = {
        backendURI : props.backendURI
    }

    return(
        <div>
        <Welcome/>
        <DocumentDirectory props = { documentDirectoryProp }/>
        <LogOutButton props = { logOutButtonProp }/>
        </div>
    );
}

export default Profile;