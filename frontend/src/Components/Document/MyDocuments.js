
function MyDocuments({ backendURI }) {
    return (
        <div id="myDocument">
            <h3>My Documents</h3>

            <ul style={{ textAlign: 'center', fontSize: '30px', paddingBottom: '20px', paddingTop: '50px', listStyleType: 'none', margin: '0', padding: '0' }}>
                {documents.map((document) => (
                    <li
                        style={{ cursor: 'pointer', paddingBottom: '20px' }}
                        key={document._id}
                        onClick={() => handleDocumentClick(document._id)}
                    >
                        {document.title}
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default MyDocuments;