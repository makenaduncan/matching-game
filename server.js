const express = require("express");
const app = express();
const mongodb = require("./db/mongoConnect");
const { requiresAuth } = require("express-openid-connect");
const port = process.env.PORT || 3000;
const cors = require("cors");
const User = require('./models/user');

const { auth } = require("express-openid-connect");
const { get } = require("mongoose");

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.use(cors({
  origin: ['https://kim-quirk.github.io/cold-case', 'http://localhost:8080']
}))

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

app.use((req, res, next) => {

  // Find out if user is in the collection already.
  // If not, Create new user object based on OIDC and add to collection.
  // If they are in collection, update last login time and increment number of calls.
  // Set req.user equal to the whole user object of the colletion for the user.
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
})

// Pulls user information from Auth0 and creates a profile
app.get("/user", requiresAuth(), (req, res) => {

  try {
    res.send(JSON.stringify(req.oidc.user));

  } catch(err) {
    res.send(403).json({message: err.message});
  }
  
});


// Use json and also require index file that will reference all other route files.
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/', requiresAuth(), require('./routes/index'));

mongodb.connectDB();

app.listen(port, () =>
console.log(`listening on PORT ${port}`));
