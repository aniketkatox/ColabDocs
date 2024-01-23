const express = require('express');
const router = express.Router();
const { Document } = require('../Models/documentModel');


// Create a new document
router.post('/create', async (req, res) => {
    console.log('Handling create document request...');
    console.log('User session:', req.session.userId);
    try {
        if (!req.session.userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const createdBy = req.session.userId;

        // Extract document details from the request body
        const { title, content } = req.body;

        // Create a new document
        const newDocument = new Document({
            title,
            content,
            createdBy,
        });

        await newDocument.save();

        res.status(201).json({ message: 'Document created successfully!', document: newDocument });
    } catch (error) {
        console.error('Error creating document:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get all documents for the current user
router.get('/all', async (req, res) => {
    try {
        // Check if user is logged in
        if (!req.session.userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const createdBy = req.session.userId;
        const documents = await Document.find({ createdBy });

        res.status(200).json({ documents });
    } catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// to get document by document id
router.get('/:documentId', async (req, res) => {
    try {
        const document = await Document.findById(req.params.documentId);

        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        res.json({ content: document.content });
    } catch (error) {
        console.error('Error fetching document content:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
