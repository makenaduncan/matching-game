const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    name: String,
    email: String,
    picture: String,
    creationDate: Date,
    lastLogin: Date,
    gamesCompleted: Number,
    highestScore: Number,
    isEmailVerified: Boolean
});

const user = mongoose.model('User', userSchema, "user");

module.exports = user;