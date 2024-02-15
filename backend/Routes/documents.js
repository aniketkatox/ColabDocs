const express = require('express');
const router = express.Router();
const { Document } = require('../Models/documentModel');
const { User, userValidation } = require('../Models/userModel');
const { v4: uuidv4 } = require('uuid');
const ShareDB = require('sharedb');
const richText = require('rich-text');


function generateGUID() {
    return uuidv4();
}

router.post('/create', async (req, res) => {
    try {
        if (!req.session.userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const email = req.session.email;
        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({ message: 'User not found!' });
            return;
        }

        const { title, content } = req.body;

        const newDocument = new Document({
            title,
            content,
            documentId: generateGUID()
        });

        user.documents.push(newDocument.documentId);

        ShareDB.types.register(richText.type);
        const db = require('sharedb-mongo')('mongodb://localhost:27017/test');
        const shareDB = new ShareDB({db});
        var shareDBConnection = shareDB.connect();
        var doc = shareDBConnection.get('documents', newDocument.documentId);
        doc.fetch(function(err) {
            if (err) throw err;
            if (doc.type === null) {
                doc.create([{insert: newDocument.content}], 'rich-text', null);
                console.log("created doc!")
                return;
            }
        });

        await newDocument.save();
        await user.save();

        res.status(201).json({ message: 'Document created successfully!', document: newDocument.documentId });
        return;
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
        return;
    }
});

router.post('/addOwner', async (req, res) => {
    try {
        if (!req.session.userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const email = req.session.email;
        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({ message: 'User not found!' });
            return;
        }

        const { newUserEmail, documentId } = req.body;

        if(newUserEmail === email){
            res.status(400).json({ message: 'You already have this doc!' });
            return;
        }

        const newUser = await User.findOne({ email: newUserEmail });

        newUser.documents.push(documentId);

        await newUser.save();

        res.status(201).json({ message: newUserEmail + ' added to the owners!' });
        return;
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
        return;
    }
});

router.post('/giveAccess', async (req, res) => {
    try {
        if (!req.session.userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const email = req.session.email;
        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({ message: 'User not found!' });
            return;
        }

        const { newUserEmail, documentId, access } = req.body;

        if(newUserEmail === email){
            res.status(400).json({ message: 'You already have this doc!' });
            return;
        }

        const newUser = await User.findOne({ email: newUserEmail });

        const sharedDocument = {
            documentId,
            access
        };

        newUser.sharedDocuments.push(sharedDocument);
        await newUser.save();

        res.status(201).json({ message: newUserEmail + ' Access given !' });
        return;
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
        return;
    }
});

router.get('/myDocuments', async (req, res) => {
    try {
        if (!req.session.userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        const email = req.session.email;
        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({ message: 'User not found!' });
            return;
        }

        var documents = user.documents;
        var foundDocuments = await Document.find({ documentId: { $in: documents } })
            .then((foundDocuments) => {
                return foundDocuments;
            })
            .catch((error) => {
                res.status(500).json({ foundDocuments });
                return;
            });

        res.status(200).json({ foundDocuments });
        return;
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
        return;
    }
});

router.get('/sharedDocuments', async (req, res) => {
    try {
        if (!req.session.userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        const email = req.session.email;
        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({ message: 'User not found!' });
            return;
        }

        const sharedDocumentsIds = user.sharedDocuments.map(document => document.documentId);

        var foundDocuments = await Document.find({ documentId: { $in: sharedDocumentsIds } })
        .then((foundDocuments) => {
            return foundDocuments;
        })
        .catch((error) => {
            res.status(500).json({ foundDocuments });
            return;
        });

        const sharedDocumentArrayWithPermission = foundDocuments.map(foundDoc => {
            const docPermissionObj = user.sharedDocuments.find(sharedDoc => sharedDoc.documentId === foundDoc.documentId);
        
            return {
                title: foundDoc.title,
                content: foundDoc.content,
                documentId: foundDoc.documentId,
                access: docPermissionObj ? docPermissionObj.access : false 
            };
        });

        res.status(200).json({ sharedDocumentArrayWithPermission });
        return;
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
        return;
    }
})

router.get('/:documentId', async (req, res) => {
    try {
        const document = await Document.findById(req.params.documentId);

        if (!document) {
            res.status(404).json({ message: 'Document not found' });
            return;
        }

        res.json({ content: document.content });
        return;
    } catch (error) {
        console.error('Error fetching document content:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
    }
});


module.exports = router;
