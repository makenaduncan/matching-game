const url = require("url");
const Score = require("../models/score");
const User = require("../models/user");


const getScores = async (req, res) => {


  try {
    // Save queries made by front end
    const queryObject = req.query;
    console.log(queryObject);

    // Pass in email as username to get
    scores = await getAllScores();

    var result = scores;

    // Query
    if (queryObject.ranking != null) {
      result = scores.filter((item) => item.ranking == queryObject.ranking);
    }
    if (queryObject.username != null) {

        result = scores.filter((item) => item.username == queryObject.username)

        result = getRanking(result);
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createScores = async (req, res) => {
  // #swagger.tags = ['Score']
  // #swagger.description = 'Create score item and add to collection'

  const score = new Score({
    username: req.oidc.user.email,
    score: req.body.score,
  });

  try {
    const newScoreItem = await score.save();
    res.status(201).json(newScoreItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }

  // Find out if the new score is higher than the user's highest score. Update highest score if true.
  if (score.username == req.oidc.user.email)
  {

    user = await User.findOne({'email': req.oidc.user.email});

    if (score.score > user.highestScore)
    {
      user.highestScore = score.score;
      
    }

    user.gamesCompleted = user.gamesCompleted + 1;

    await user.save();
    
  }

};

// /scores/{id} ENDPOINTS
const getScoreWithID = async (req, res) => {
  // #swagger.tags = ['Score']
  // #swagger.description = 'Get score item in collection based on ID'

  try {
    res.status(200).json(res.score);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteScoreWithID = async (req, res) => {
  // #swagger.tags = ['Score']
  // #swagger.description = 'Get score item in collection based on ID'

  try {
    await res.score.deleteOne();
    res.status(200).json({ message: "Delete Successful." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// MIDDLEWARE
async function getScoreById(req, res, next) {
  let score;

  try {
    score = await Score.findById(req.params.id);

    if (score == null) {
      return res.status(404).json({
        message:
          "Could not find specified score by ID. Check ID and try again.",
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.score = score;
  next();
}

// Internal Private helper function
async function getAllScores() {
  scores = await Score.find();

  var result = getRanking(scores)
  return result;
}


function getRanking(scores)
{
  var result = scores.sort((a, b) => b.score - a.score);

  index = 1;
  result.forEach((score) => {
    score.ranking = index++;
  });

  return result
}
module.exports = {
  getScores,
  createScores,
  getScoreWithID,
  deleteScoreWithID,
  getScoreById
};
