const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema({
  caseName: String,
  summariedCaseDescription: String,
  caseType: String,
  victimPicture: String,
  victimName: String,
  victimAge: String,
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
