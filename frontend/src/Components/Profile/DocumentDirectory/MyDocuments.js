import axios from 'axios';
import React, { useState, useEffect } from 'react';

function MyDocuments({ props }) {
    const backendURI = props.backendURI;
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        loadDocuments();
    }, [props.trigger]);

    function openDocument(document){
        props.setCurrDocument(document);
    }

    async function loadDocuments(){
        try{
            await axios.get(backendURI + '/documents/myDocuments', { withCredentials: true }).then(response => {
                if (response.status === 200) {
                    setDocuments(response.data.foundDocuments);
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
        <div id="myDocument">
            <h2>My Documents</h2>
            <ul>
                {documents.map((document) => (
                    <div className="documentListItem" key={document._id}>
                        <li onClick={ () => openDocument(document) }>
                            {document.title}
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default MyDocuments;