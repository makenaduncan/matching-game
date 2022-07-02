const mongoose = require('mongoose')

const scoreSchema = new mongoose.Schema({

    ranking: Number,
    username: String,
    score: Number

});

const score = mongoose.model('Score', scoreSchema, "score");

module.exports = score;