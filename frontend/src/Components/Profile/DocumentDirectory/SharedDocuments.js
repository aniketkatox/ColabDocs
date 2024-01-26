import axios from 'axios';
import React, { useState, useEffect } from 'react';

function SharedDocuments({ props }){
    const backendURI = props.backendURI;
    const [sharedDocument, setSharedDocument] = useState([]);

    useEffect(() => {
        loadDocuments();
    }, []);

    function openDocument(document){
        props.setCurrDocument(document);
    }

    async function loadDocuments(){
        try{
            await axios.get(backendURI + '/documents/sharedDocuments', { withCredentials: true }).then(response => {
                if (response.status === 200) {
                    setSharedDocument(response.data.sharedDocumentArrayWithPermission);
                }else{
                    alert(response.data.message);
                }
            }).catch(error => {
                alert(error.response.data.message);
            });
        }catch(error){
            console.error('Error:', error);
        }
    }

    return (
        <div id="sharedDocument">
            <h2>Shared Documents</h2>
            <ul>
                {sharedDocument.map((document) => (
                    <div className="sharedDocumentListItem" key={document._id}>
                        <li onClick={ () => openDocument(document) }>
                            {document.title}
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default SharedDocuments;