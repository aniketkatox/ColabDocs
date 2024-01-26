import CurrentDocument from "./CurrentDocument";
import OwnerShipManager from "./OwnerShipManager";

function DocumentViewer({ props }){

    var currentDocumentProp = {
        document : props.document
    }

    var ownerShipManagerProp = {
        backendURI : props.backendURI,
        documentId : props.document.documentId
    }

    return(
        <div id="documentViewer">
            <OwnerShipManager props = { ownerShipManagerProp }/>
            <div id="accessManager">
                <field>email</field>
                <radio>R/W</radio>
                <button>Button</button>
            </div>
            <CurrentDocument props = { currentDocumentProp }/>
            <div id="documentCloser">
                <p onClick={() => props.setCurrDocument(null) }>X</p>
            </div>
        </div>
    )
}

export default DocumentViewer;