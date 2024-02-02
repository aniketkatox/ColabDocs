const express = require('express');
const router = express.Router();
const { Document } = require('../Models/documentModel');

// Middleware to check if the user is logged in
const isLoggedInMiddleware = (req, res, next) => {
    if (req.session.user) {
        // User is logged in
        next();
    } else {
        // User is not logged in
        // res.status(401).json({ message: 'Unauthorized' });
        res.redirect('/signin');
    }
};

router.get('/document-directory', isLoggedInMiddleware, async (req, res) => {
    try {
        // Check if user is logged in
        if (!req.session.user || !req.session.user.id) {
            res.status(401).json({ error: 'Unauthorized' });
        }

        const createdBy = req.session.user.id;

        // Fetch documents for the current user
        const documents = await Document.find({ createdBy });

        res.status(200).json({ message: 'You are authorized to access this route!', documents });
    } catch (error) {
        console.error('Error in document-directory route:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
