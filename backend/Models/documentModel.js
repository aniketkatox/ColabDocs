const mongoose = require('mongoose')

//Schema for Documents
const documentSchema = new mongoose.Schema({
    title: String,
    content: String,
    documentId: String
});

//Model for Documents
const Document = mongoose.model('Document', documentSchema);
exports.Document = Document;