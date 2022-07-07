const Case = require('../models/case');
const Agency = require('../models/agency');


const getCases = async (req, res) => {
    try {
        // Save queries made by front end
        const queryObject = req.query;
        
        cases = await getAllCases();

        var result = cases;

        // Query
        // if(queryObject.name != null)
        // {
        //    result = scores.filter(item => item.name == queryObject.name);
        // }

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
    
    // Load
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

// const deleteScoreWithID = async (req, res) => {

//     // #swagger.tags = ['Score']
//     // #swagger.description = 'Get score item in collection based on ID'

//     try {
//         await res.score.deleteOne();
//         res.status(200).json({message: "Delete Successful."});
//     } catch(err) {
//         res.status(400).json({message:err.message});
//     }

// }

// const updateScoreWithID = async (req, res) => {

//     // #swagger.tags = ['Score']
//     // #swagger.description = 'Update score item in collection based on ID'

//     if(req.body.ranking != null)
//     {
//         res.score.ranking = req.body.ranking;
//     }

//     if(req.body.username != null)
//     {
//         res.score.username = req.body.username;
//     }

//     if(req.body.score != null)
//     {
//         res.score.score = req.body.score;
//     }

// }


// // MIDDLEWARE
async function getCaseById(req, res, next) {
    let caseItem;

    try {
        caseItem = await Case.findById(req.params.id)
        .populate("agencyInformation");

        if(caseItem == null)
        {
            return res.status(404).json({message: "Could not find specified score by ID. Check ID and try again."});
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
    getCaseById
}