const mongoose = require('mongoose')

const agencySchema = new mongoose.Schema({

    agencyName: String,
    supervisorName: String,
    phoneNumber: String,
    email: String

});

const agencies = mongoose.model('Agency', agencySchema, "agencies");

module.exports = agencies;