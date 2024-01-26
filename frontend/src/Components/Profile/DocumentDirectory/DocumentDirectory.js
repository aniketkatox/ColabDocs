import CreateDocument from "./CreateDocument";
import CurrentDocument from "./CurrentDocument";
import DocumentViewer from "./DocumentViewer";
import MyDocuments from "./MyDocuments";
import SharedDocuments from "./SharedDocuments";
import React, { useState, useEffect } from 'react';

function DocumentDirectory({ props }) {
    const [trigger, setTrigger] = useState(0);
    const [currDocument, setCurrDocument] = useState(null);

    function reTrigger(){
        console.log("trigger");
        setTrigger(trigger + 1);
    }

    var createDocumentProp = {
        backendURI : props.backendURI,
        reTrigger
    }

    var myDocumentsProp = {
        backendURI : props.backendURI,
        trigger,
        setCurrDocument
    }

    var documentViewerProp = {
        backendURI : props.backendURI,
        document : currDocument,
        setCurrDocument
    }

    var sharedDocumentsProp = {
        backendURI : props.backendURI,
        setCurrDocument
    }

    if(currDocument != null){
        return(
            <DocumentViewer props={ documentViewerProp }/>
        )
    }else{
        return(
            <div id="documentDirectory">
                <CreateDocument props = { createDocumentProp }/>
                <MyDocuments props = { myDocumentsProp }/>
                <SharedDocuments props = { sharedDocumentsProp }/>
            </div>
        );
    }
}

export default DocumentDirectory;