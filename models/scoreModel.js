const mongoose = require('mongoose')

const scoreSchema = new mongoose.Schema({

    ranking: Number,
    username: String,
    score: Number

});

const scores = mongoose.model('Score', scoreSchema, "scores");

module.exports = scores;