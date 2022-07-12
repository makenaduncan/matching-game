const Score = require("../models/score");
const User = require("../models/user");


const getProfile = async (req, res) => {

  try {
    // Find corresponding auth0 user in database and display that
    // since we have more properties we want to display.
    const dbUser = await User.findOne({'email': req.oidc.user.email});

    res.status(200).json(dbUser);

  } catch(err) {


  }

}

const getUsers = async (req, res) => {

  try {
    // Save queries made by front end
    const queryObject = req.query;

    // Pass in email as username to get
    users = await getAllUsers();

    var result = users;

    // // Query
    // if (queryObject.ranking != null) {
    //   result = scores.filter((item) => item.ranking == queryObject.ranking);
    // }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createUser = async (req, res) => {

  let date = new Date();
  

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    picture: req.body.picture,
    creationDate: date,
    lastLogin: date,
    gamesCompleted: 0, // Can't complete games if you haven't created an account yet!
    highestScore: 0 // No scores yet. scoreController handles updating this during score creation.
  });

  try {
    const newUserItem = await user.save();
    res.status(201).json(newUserItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// /scores/{id} ENDPOINTS
const getUser = async (req, res) => {

  try {
    res.status(200).json(res.user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {

  try {
    await res.user.deleteOne();
    res.status(200).json({ message: "Delete Successful." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {

  if (req.body.name != null) {
    res.user.name = req.body.name;
  }

  if (req.body.picture != null) {
    res.user.picture = req.body.picture
  }

  if (req.body.email != null) {
    res.user.email = req.body.email;
  }

  // TODO: Determine if this needs to be here or not.
  if (req.body.gamesCompleted != null) {
    res.user.gamesCompleted = req.body.gamesCompleted;
  }
};


// MIDDLEWARE
async function getUserById(req, res, next) {
  let user;

  try {
    user = await User.findById(req.params.id)

    if (user == null) {
      return res.status(404).json({
        message:
          "Could not find specified user by ID. Check ID and try again.",
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

async function getAllUsers() {

  users = await User.find()

  return users;
}

module.exports = {
  getProfile,
  getUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
  getUserById,
};
