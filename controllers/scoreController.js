const Score = require('../models/scoreModel');

// /scores endpoints

const getScores = async (req, res) => {

    try {
        const scores = await Score.find();
        res.status(200).json(scores);

    } catch(err) {
        res.status(500).json({message: err.message});
    }
}

const createScores = async (req, res) => {

    const score = new Score ({

        ranking: req.body.ranking,
        username: req.body.username,
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

    try {
        res.status(200).json(res.score);
    } catch(err) {
        res.status(400).json({message:err.message});
    }

}

const deleteScoreWithID = async (req, res) => {

    try {
        await res.score.deleteOne();
        res.status(204);
    } catch(err) {
        res.status(400).json({message:err.message});
    }

}

const updateScoreWithID = async (req, res) => {

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

    try {
        res.status(200).json(res.score);
    } catch(err) {
        res.status(400).json({message:err.message});
    }

}

const deleteScoreWithRanking = async (req, res) => {

    try {
        await res.score.deleteOne();
        res.status(204);
    } catch(err) {
        res.status(400).json({message:err.message});
    }

}

const updateScoreWithRanking = async (req, res) => {

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