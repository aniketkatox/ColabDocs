import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CreateDocument from './CreateDocument';
import MyDocuments from './MyDocuments';


function Documents({ backendURI }) {
    const [documents, setDocuments] = useState([]);
    const [newDocumentData, setNewDocumentData] = useState({
        title: '',
        content: '',
    });

    function changedocuments(createdDocument){
        setDocuments([...documents, createdDocument]);
    }

    function changenewDocumentData(newData){
        setNewDocumentData(newData);
    }

    function getnewDocumentData(){
        return newDocumentData;
    }

    return (
        <div id="document">
            <h1>Document Directory</h1>
            <p>Welcome to Document Directory</p>

            <CreateDocument backendURI = { backendURI }
            changedocuments={changedocuments} changenewDocumentData={changenewDocumentData} getnewDocumentData = {getnewDocumentData}></CreateDocument>

            <MyDocuments backendURI = { backendURI }></MyDocuments>
            
            <div id="sharedDocument">
                <h3>Shared Documents</h3>
            </div>
        </div>
    )
}

export default Documents;