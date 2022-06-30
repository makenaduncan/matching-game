const mongoose = require('mongoose')

const scoreSchema = new mongoose.Schema({

    agencyName: String,
    supervisorName: String,
    phoneNumber: String,
    email: String

});

const scores = mongoose.model('Agency', scoreSchema, "scores");

module.exports = scores;