import React, { useState } from 'react';
import axios from 'axios';

function AccessManager({ props }) {

    var backendURI = props.backendURI;
    var documentId = props.documentId;

    const [email, setEmail] = useState('');
    const [access, setAccess] = useState('');

    async function giveAccess() {
        try {
            const accessData = {
                newUserEmail: email,
                documentId,
                access
            };

            await axios.post(backendURI + '/documents/giveAccess', accessData, { withCredentials: true }).then(response => {
                if (response.status === 201) {
                    alert(response.data.message);
                } else {
                    alert(response.data.message);
                }
            }).catch(error => {
                alert(error.response.data.message);
                console.error('Error:', error);
            });

        } catch (error) {
            console.error('Error creating document:', error);
        }
    }

    return (
        <div id="accessManager">
            <h2>Access Manager</h2>

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
                
                <label>
                    <input
                        type="radio"
                        name="access"
                        value="read"
                        onChange={(e) => setAccess('read')}
                    />
                    Read
                </label>

                <label>
                    <input
                        type="radio"
                        name="access"
                        value="write"
                        onChange={(e) => setAccess('write')}
                    />
                    Write
                </label>

                <button type="button" onClick={giveAccess}>
                    Give Access
                </button>
            </form>

        </div>
    );
}

export default AccessManager;