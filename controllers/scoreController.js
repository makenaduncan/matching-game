const url = require('url');
const Score = require('../models/score');
const { auth } = require("express-openid-connect")

// /scores endpoints

const getScores = async (req, res) => {
    // #swagger.tags = ['Score']
    // #swagger.description = 'Get all score items in collection'

    try {
        const queryObject = req.query;
        // {name:"dad", fine:10, id:"23423098472398742342"}
        
        // rasdfasdfasdfasdf/scores?name=dad&fine=10&id=234234234

        // query.Where(x => x.name is bill && false)
        // query.Where(x => (queryObject.Id == null || x.Id == queryObject.Id) &&
        // (queryObject.Name == null || x.Name == queryObject.Name) &&)


        scores = await getAllScores(req.oidc.user.email);


        
        var result = scores;

        // Query
        if(queryObject.ranking != null)
        {
           result = scores.filter(item => item.ranking == queryObject.ranking);
        }
        if(queryObject.username != null)
        {
           result = scores.filter(item => item.username == queryObject.username);
        }

        res.status(200).json(result);
    } catch(err) {
        res.status(500).json({message: err.message});
    }
}

const createScores = async (req, res) => {

    // #swagger.tags = ['Score']
    // #swagger.description = 'Create score item and add to collection'

    const score = new Score ({
        username: req.oidc.user.email,
        score: req.body.score
    })
    
    try {
        const newScoreItem = await score.save();
        res.status(201).json(newScoreItem);

    } catch(err) {
        res.status(400).json({message: err.message});
    }
}

// /scores/{id} ENDPOINTS
const getScoreWithID = async (req, res) => {

    // #swagger.tags = ['Score']
    // #swagger.description = 'Get score item in collection based on ID'

    try {
        res.status(200).json(res.score);
    } catch(err) {
        res.status(400).json({message:err.message});
    }

}

const deleteScoreWithID = async (req, res) => {

    // #swagger.tags = ['Score']
    // #swagger.description = 'Get score item in collection based on ID'

    try {
        await res.score.deleteOne();
        res.status(200).json({message: "Delete Successful."});
    } catch(err) {
        res.status(400).json({message:err.message});
    }

}

const updateScoreWithID = async (req, res) => {

    // #swagger.tags = ['Score']
    // #swagger.description = 'Update score item in collection based on ID'

    if(req.body.ranking != null)
    {
        res.score.ranking = req.body.ranking;
    }

    if(req.body.username != null)
    {
        res.score.username = req.body.username;
    }

    if(req.body.score != null)
    {
        res.score.score = req.body.score;
    }

}

// /scores/{ranking} ENDOINTS
// /scores/{id} ENDPOINTS
const getScoreWithRanking = async (req, res) => {

    // #swagger.tags = ['Score']
    // #swagger.description = 'Get score item in collection based on ranking'

    try {
        res.status(200).json(res.score);
    } catch(err) {
        res.status(400).json({message:err.message});
    }

}

const deleteScoreWithRanking = async (req, res) => {

    // #swagger.tags = ['Score']
    // #swagger.description = 'Delete score item in collection based on ranking'

    try {
        await res.score.deleteOne();
        res.status(204);
    } catch(err) {
        res.status(400).json({message:err.message});
    }

}

const updateScoreWithRanking = async (req, res) => {

    // #swagger.tags = ['Score']
    // #swagger.description = 'Update score item in collection based on ranking'

    if(req.body.ranking != null)
    {
        res.score.ranking = req.body.ranking;
    }

    if(req.body.username != null)
    {
        res.score.username = req.body.username;
    }

    if(req.body.score != null)
    {
        res.score.score = req.body.score;
    }

}

// MIDDLEWARE
async function getScoreById(req, res, next) {
    let score;

    try {
        score = await Score.findById(req.params.id);

        if(score == null)
        {
            return res.status(404).json({message: "Could not find specified score by ID. Check ID and try again."});
        }
    } catch(err) {
        return res.status(500).json({message: err.message});
    }
    res.score = score;
    next();
}

async function getScoreByRanking(req, res, next) {
    let score;

    try {
        score = await Score.findById(req.params.ranking);

        if(score == null)
        {
            return res.status(404).json({message: "Could not find specified score by ranking number. Check rank number and try again."});
        }
    } catch(err) {
        return res.status(500).json({message: err.message});
    }
    res.score = score;
    next();
}

async function getAllScores(email)
{
    scores = await Score.find();
    scores = scores.filter(item => item.username == email);

    var result = scores.sort((a,b) => b.score- a.score);
        
        index = 1
        result.forEach(score => {
            
            score.ranking = index++;
            
        });
    return scores;
}

module.exports = {
    getScores,
    createScores,
    getScoreWithID,
    deleteScoreWithID,
    updateScoreWithID,
    getScoreWithRanking,
    deleteScoreWithRanking,
    updateScoreWithRanking,
    getScoreById,
    getScoreByRanking
}