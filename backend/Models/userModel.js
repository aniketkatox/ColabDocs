const Joi = require('joi')
const mongoose = require('mongoose')

var sharedDocument = {
    documentId : String,
    access : Boolean
}

//Schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    documents: [String],
    sharedDocuments : [sharedDocument]
});
  
//Model
const User = mongoose.model('User', userSchema);

// Joi validator
const userValidation = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

exports.User = User
exports.userValidation = userValidation