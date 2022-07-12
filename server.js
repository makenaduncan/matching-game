const express = require("express");
const app = express();
const mongodb = require("./db/mongoConnect");
const { requiresAuth } = require("express-openid-connect");
const port = process.env.PORT || 3000;
const cors = require("cors");
const User = require('./models/user');

const { auth } = require("express-openid-connect");

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

  getUser(req, res);
  
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


 const getUser = async (req, res) => {

  // Check if user is signed in already
  if (req.oidc.isAuthenticated())
  {
    // Prevents duplicate calls.
    if (req.user != null)
    {
      return req.user;
    }

    dbUserEntry = null;
    // Get user from database (if there is one) that matches the 
    dbUserEntry = await User.findOne({'email': req.oidc.user.email});

    // If the user exists, then update the last login.
    if (dbUserEntry != null)
    {
      date = new Date();
      dbUserEntry.lastLogin = date;
      await dbUserEntry.save();
      req.user = dbUserEntry;
      
      return req.user;
    }

    // Old Time 2022-07-12T03:36:15.807+00:00
    // New Time 2022-07-12T10:09:17.039+00:00
    
    // If user does not exist in the database, create the user and store it.
    newUser = new User ({

      name: req.oidc.user.name,
      email: req.oidc.user.email,
      creationDate: new Date(),
      lastLogin: new Date(),
      gamesCompleted: 0,
      highestScore: 0

    })

    try {
      saveUserItem = await newUser.save();
      console.log("User " + req.oidc.user.name + " created successfully!");

    } catch(err) {
      console.log("ERR: User was not created.")

    }

  }
}


// Use json and also require index file that will reference all other route files.
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/', requiresAuth(), require('./routes/index'));

mongodb.connectDB();

app.listen(port, () =>
console.log(`listening on PORT ${port}`));
