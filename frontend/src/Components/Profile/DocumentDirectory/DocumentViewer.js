import CurrentDocument from "./CurrentDocument";
import OwnerShipManager from "./OwnerShipManager";
import AccessManager from "./AccessManager";

function DocumentViewer({ props }){

    var currentDocumentProp = {
        document : props.document
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
            <OwnerShipManager props = { ownerShipManagerProp }/>

            <AccessManager props = { accessManagerProp } />

            <CurrentDocument props = { currentDocumentProp }/>
            <div id="documentCloser">
                <p onClick={() => props.setCurrDocument(null) }>X</p>
            </div>
        </div>
    )
}

export default DocumentViewer;