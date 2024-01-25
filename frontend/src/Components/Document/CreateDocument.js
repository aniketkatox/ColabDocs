import axios from 'axios';
import React, { useEffect, useState } from 'react';

function CreateDocument({backendURI, changedocuments, changenewDocumentData, getnewDocumentData}){

    
    const handleCreateDocument = async () => {
        try {
            const response = await axios.post(backendURI + '/documents/create', getnewDocumentData(), { withCredentials: true });
            const createdDocument = response.data.document;
            changedocuments(createdDocument);   //setDocuments([...documents, createdDocument]);
            changenewDocumentData({ title: '', content: '' });    //setNewDocumentData({ title: '', content: '' });
            console.log('Document created successfully:', createdDocument);
        } catch (error) {
            console.error('Error creating document:', error);
        }
    };

    return (
        <div id="createDocument">
                <h2>Create New Document</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <label>
                        Title:
                        <input
                            type="text"
                            name="title"
                            value={newDocumentData.title}
                            onChange={(e) => changenewDocumentData({ ...getnewDocumentData(), title: e.target.value })}
                        />
                    </label>
                    <label>
                        Content:
                        <textarea
                            name="content"
                            value={newDocumentData.content}
                            onChange={(e) => changenewDocumentData({ ...getnewDocumentData(), content: e.target.value })}
                        />
                    </label>
                    <button type="button" onClick={handleCreateDocument}>
                        Create Document
                    </button>
                </form>
            </div>
    )
}

export default CreateDocument;