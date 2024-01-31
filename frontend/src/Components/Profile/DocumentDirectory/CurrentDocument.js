import React, { useEffect } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import * as sharedb from 'sharedb/lib/client';
import richText from "rich-text";
import Quill from 'quill';

function CurrentDocument({ props }){
    const title = props.document.title;
    const content = props.document.content;
	const documentId = props.document.documentId;

    sharedb.types.register(richText.type);
	var doc;
	var quill = null;
	// var socket;

	useEffect(() => {

		var socket = new ReconnectingWebSocket('ws://' + 'localhost:3001', [], {
			maxEnqueuedMessages: 0
		});

		socket.addEventListener('open', (event) => {
			
			var connection = new sharedb.Connection(socket);
			var doc = connection.get('documents', 'rich-text');

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

	});
    
    return(
        <div id="currDocument">
            <h2>{title}</h2>
            <pre>{content}</pre>
            <div id="editor"></div>
        </div>
    );
}

export default CurrentDocument;