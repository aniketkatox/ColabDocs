const express = require('express');
const router = express.Router();
const { Document } = require('../Models/documentModel');
const { User, userValidation } = require('../Models/userModel');
const { v4: uuidv4 } = require('uuid');

function generateGUID() {
    return uuidv4();
}

router.post('/create', async (req, res) => {
    try {
        if (!req.session.userId) {
            res.status(401).json({ message: 'Unauthorized' });
        }
        const email = req.session.email;
        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({ message: 'User not found!' });
        }

        const { title, content } = req.body;

        const newDocument = new Document({
            title,
            content,
            documentId: generateGUID()
        });

        user.documents.push(newDocument.documentId);

        await newDocument.save();
        await user.save();

        res.status(201).json({ message: 'Document created successfully!', document: newDocument.documentId });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/addOwner', async (req, res) => {
    try {
        if (!req.session.userId) {
            res.status(401).json({ message: 'Unauthorized' });
        }

        const email = req.session.email;
        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({ message: 'User not found!' });
        }

        const { newUserEmail, documentId } = req.body;

        if(newUserEmail === email){
            res.status(400).json({ message: 'You already have this doc!' });
        }

        console.log(newUserEmail);
        const newUser = await User.findOne({ email: newUserEmail });

        newUser.documents.push(documentId);

        await newUser.save();

        res.status(201).json({ message: newUserEmail + ' added to the owners!' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/giveAccess', async (req, res) => {
    try {
        if (!req.session.userId) {
            res.status(401).json({ message: 'Unauthorized' });
        }

        const email = req.session.email;
        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({ message: 'User not found!' });
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
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/myDocuments', async (req, res) => {
    try {
        if (!req.session.userId) {
            res.status(401).json({ error: 'Unauthorized' });
        }

        const email = req.session.email;
        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({ message: 'User not found!' });
        }

        var documents = user.documents;
        var foundDocuments = await Document.find({ documentId: { $in: documents } })
            .then((foundDocuments) => {
                return foundDocuments;
            })
            .catch((error) => {
                res.status(500).json({ foundDocuments });
            });

        res.status(200).json({ foundDocuments });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/sharedDocuments', async (req, res) => {
    try {
        if (!req.session.userId) {
            res.status(401).json({ error: 'Unauthorized' });
        }

        const email = req.session.email;
        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({ message: 'User not found!' });
        }

        const sharedDocumentsIds = user.sharedDocuments.map(document => document.documentId);

        var foundDocuments = await Document.find({ documentId: { $in: sharedDocumentsIds } })
        .then((foundDocuments) => {
            return foundDocuments;
        })
        .catch((error) => {
            res.status(500).json({ foundDocuments });
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

        console.log(sharedDocumentArrayWithPermission);
        res.status(200).json({ sharedDocumentArrayWithPermission });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

router.get('/:documentId', async (req, res) => {
    try {
        const document = await Document.findById(req.params.documentId);

        if (!document) {
            res.status(404).json({ message: 'Document not found' });
        }

        res.json({ content: document.content });
    } catch (error) {
        console.error('Error fetching document content:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
