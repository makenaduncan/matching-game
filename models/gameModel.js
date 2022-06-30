const mongoose = require('mongoose');

// Reference: https://zellwk.com/blog/mongoose-subdocuments/
const caseSchema = require('./caseModel');

const gameSchema = new mongoose.Schema({

    // Reference: https://zellwk.com/blog/mongoose-subdocuments/
    casefiles: [caseSchema],
    size: Number

});

const games = mongoose.model('Game', gameSchema, "games");

module.exports = games;