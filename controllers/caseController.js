const Case = require('../models/case');
const Agency = require('../models/agency');


const getCases = async (req, res) => {
    try {
        // Save queries made by front end
        const queryObject = req.query;
        
        cases = await getAllCases();

        var result = cases;

        // Query
        if(queryObject.caseType != null)
        {
           result = cases.filter(item => item.caseType == queryObject.caseType);
        }
        if(queryObject.caseDate != null)
        {
           result = cases.filter(item => item.caseDate == queryObject.caseDate);
        }
        if(queryObject.caseStatus != null)
        {
           result = cases.filter(item => item.caseStatus == queryObject.caseStatus);
        }



        res.status(200).json(result);
    } catch(err) {
        res.status(500).json({message: err.message});
    }
}

const createCases = async (req, res) => {

    const Newcase = new Case ({

        caseName: req.body.caseName,
        summarizedCaseDescription: req.body.summarizedCaseDescription,
        caseType: req.body.caseType,
        victimPicture: req.body.victimPicture,
        victimName: req.body.victimName,
        victimAge: req.body.victimAge,
        caseDate: req.body.caseDate,
        location: req.body.location,
        caseStatus: req.body.caseStatus,
        websiteUrl: req.body.websiteUrl
    })
    
    // Load agency information based on ID of agency.
    agency = await Agency.findById(req.body.agencyInformation);

    Newcase.agencyInformation = agency._id;

    try {
        const newCaseItem = await Newcase.save();
        res.status(201).json(newCaseItem);

    } catch(err) {
        res.status(400).json({message: err.message});
    }
}

// /scores/{id} ENDPOINTS
const getCase = async (req, res) => {

    try {
        res.status(200).json(res.case);
    } catch(err) {
        res.status(400).json({message:err.message});
    }

}

const deleteCase = async (req, res) => {

    try {
        await res.case.deleteOne();
        res.status(200).json({message: "Delete Successful."});
    } catch(err) {
        res.status(400).json({message: err.message});
    }

}

const updateCase = async (req, res) => {

    if(req.body.caseName != null)
    {
        res.case.caseName = req.body.caseName;
    }

    if(req.body.summarizedCaseDescription != null) {
        res.case.summarizedCaseDescription = req.body.summarizedCaseDescription;
    }

    if(req.body.caseType != null)
    {
        res.case.caseType = req.body.caseType;
    }
    if(req.body.victimPicture != null)
    {
        res.case.victimPicture = req.body.victimPicture;
    }
    if(req.body.victimName != null)
    {
        res.case.victimName = req.body.victimName;
    }
    if(req.body.victimAge != null)
    {
        res.case.victimAge = req.body.victimAge;
    }
    if(req.body.caseDate != null)
    {
        res.case.caseDate = req.body.caseDate;
    }
    if(req.body.location != null)
    {
        res.case.location = req.body.location;
    }
    if(req.body.caseStatus != null)
    {
        res.case.caseStatus = req.body.caseStatus;
    }
    if(req.body.websiteUrl != null)
    {
        res.case.websiteUrl = req.body.websiteUrl;
    }
    if(req.body.agencyInformation != null)
    {
        // Load agency information based on ID of agency.
        agency = await Agency.findById(req.body.agencyInformation);

        if (agency != null)
        {
            res.case.agencyInformation = agency._id;
        }
    }

    try {
        const updatedCase = await res.case.save();
        res.status(200).json(updatedCase);

    } catch(err) {
        res.status(400).json({message: err.message});
    }

}


// // MIDDLEWARE
async function getCaseById(req, res, next) {
    let caseItem;

    try {
        caseItem = await Case.findById(req.params.id)
        .populate("agencyInformation");

        if(caseItem == null)
        {
            return res.status(404).json({message: "Could not find specified case by ID. Check ID and try again."});
        }
    } catch(err) {
        return res.status(500).json({message: err.message});
    }
    res.case = caseItem;
    next();
}

async function getAllCases()
{
    cases = await Case.find()
    .populate("agencyInformation");

    return cases;
}

module.exports = {
    getCases,
    createCases,
    getCase,
    deleteCase,
    updateCase,
    getCaseById
}