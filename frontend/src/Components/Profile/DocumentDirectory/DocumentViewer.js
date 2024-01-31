import CurrentDocument from "./CurrentDocument";
import OwnerShipManager from "./OwnerShipManager";
import AccessManager from "./AccessManager";

function DocumentViewer({ props }){
    const document = props.document;

    var currentDocumentProp = {
        document : props.document,
        documentId : props.document.documentId
    }

    var ownerShipManagerProp = {
        backendURI : props.backendURI,
        documentId : props.document.documentId
    }

    var accessManagerProp = {
        backendURI : props.backendURI,
        documentId : props.document.documentId
    }

    return(
        <div id="documentViewer">

            {!('access' in document)? <OwnerShipManager props = { ownerShipManagerProp }/> : <></>}

            {!('access' in document)? <AccessManager props = { accessManagerProp } /> : <></>}
            
            <CurrentDocument props = { currentDocumentProp }/>

            <div id="documentCloser">
                <p onClick={() => props.setCurrDocument(null) }>X</p>
            </div>
        </div>
    )
}

export default DocumentViewer;