import React, { useState } from 'react';
import axios from 'axios';

function OwnerShipManager({ props }){

    var backendURI = props.backendURI;
    var documentId = props.documentId;

    const [email, setEmail] = useState('');

    async function addOwner(){
        try{
            const ownerShipData = {
                newUserEmail : email,
                documentId
            };

            await axios.post(backendURI + '/documents/addOwner', ownerShipData, { withCredentials: true }).then(response => {
                if (response.status === 201) {
                    alert(response.data.message);
                }else{
                    alert(response.data.message);
                }
            }).catch(error => {
                alert(error.response.data.message);
                console.error('Error:', error);
            });

        } catch(error){
            console.error('Error creating document:', error);
        }
    }

    return(
        <div id="ownerShipManager">
            <h2>OwnerShip Manager</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <label>
                    Email:
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <button type="button" onClick={ addOwner }>
                    Add Owner
                </button>
            </form>
        </div>
    )
}

export default OwnerShipManager;