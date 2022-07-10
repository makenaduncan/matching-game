const mongoose = require("mongoose");
const agencySchema = require("./agency");

const caseSchema = new mongoose.Schema({
  caseName: String,
  summariedCaseDescription: String,
  caseType: String,
  victimPicture: { base64: String, imageFormat: String },
  victimName: String,
  victimAge: Number,
  caseDate: Date,
  location: String,
  caseStatus: String,
  websiteUrl: String,
  agencyInformation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agency",
  },
});

const cases = mongoose.model("Case", caseSchema, "cases");

module.exports = cases;
