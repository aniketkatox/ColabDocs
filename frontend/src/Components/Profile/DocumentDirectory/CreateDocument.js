import axios from 'axios';
import React, { useEffect, useState } from 'react';

function CreateDocument({ props }){
    var backendURI = props.backendURI;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    async function createDocument(){
        try{

            const documentData = {
                title: title,
                content: content
            };

            await axios.post(backendURI + '/documents/create', documentData, { withCredentials: true }).then(response => {
                if (response.status === 201) {
                    props.reTrigger();
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

    return (
        <div id="createDocument">
                <h2>Create New Document</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <label>
                        Title:
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>
                    <br/>
                    <br/>
                    <label>
                        Content:
                        <textarea
                            name="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </label>
                    <br/>
                    <br/>
                    <button type="button" onClick={createDocument}>
                        Create Document
                    </button>
                </form>
            </div>
    )
}

export default CreateDocument;