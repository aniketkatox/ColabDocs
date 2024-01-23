const Joi = require('joi')
const mongoose = require('mongoose')

//Schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
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