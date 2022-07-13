const mongoose = require('mongoose')

const agencySchema = new mongoose.Schema({

    name: String,
    supervisor: String,
    supervisorRank: String,
    phone: String,
    email: String

});

const agencies = mongoose.model('Agency', agencySchema, "agency");

module.exports = agencies;