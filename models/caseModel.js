const mongoose = require('mongoose')
const agency = require('./agencyModel')

const caseSchema = new mongoose.Schema({

    caseName: String,
    summariedCaseDescription: String,
    caseType: String,
    victimPicture: 
    {
        data: Buffer,
        contentType: String
    },
    victimName: String,
    victimAge: Number,
    caseDate: Date,
    location: String,
    caseStatus: String,
    websiteUrl: String,
    agencyInformation: Schema.ObjectId
});

const cases = mongoose.model('Case', caseSchema, "cases");

module.exports = cases;