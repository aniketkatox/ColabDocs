import React, { useEffect } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import * as sharedb from 'sharedb/lib/client';
import richText from "rich-text";
import Quill from 'quill';

function CurrentDocument({ props }){
    const backendURI = props.backendURI.replace(/^http?:\/\//, '');
    ;
    const title = props.document.title;
    const content = props.document.content;
	const documentId = props.document.documentId;
	var accessPermission = true;
	if(props.document.hasOwnProperty('access')){
		accessPermission = props.document.access;
	}

    sharedb.types.register(richText.type);
	var doc;
	var quill = null;

	useEffect(() => {
		if(accessPermission){
			var socket = new ReconnectingWebSocket('ws://' + backendURI, [], {
				maxEnqueuedMessages: 0
			});
	
			socket.addEventListener('open', (event) => {
				
				const dataToSend = {
					documentId
				};
				
				// Convert the object to a JSON string before sending
				const jsonString = JSON.stringify(dataToSend);
				
				// Send the JSON string to the server
				socket.send(jsonString);
				new Promise(resolve => setTimeout(resolve, 3000));
				var connection = new sharedb.Connection(socket);
				var doc = connection.get('documents', documentId);
	
				doc.subscribe(function(err) {
					if (err) throw err; 
					if(quill == null){
						quill = new Quill('#editor', {theme: 'snow'});
						quill.setContents(doc.data);
						quill.on('text-change', function(delta, oldDelta, source) {
							if (source !== 'user') return;
							doc.submitOp(delta, {source: quill});
						});
						doc.on('op', function(op, source) {
							if (source === quill) return;
							quill.updateContents(op);
						});
					}
				});
			});
		}
		console.log(accessPermission);
		console.log(content);
	});
    
    return(
        <div id="currDocument">
            <h2>{title}</h2>
			{(accessPermission)? <div id="editor"></div> : ((content != "") ? <div><pre>{content}</pre></div> : <div>No content available</div>)}
        </div>
    );
}

export default CurrentDocument;