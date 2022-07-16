const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongodb = require("./db/mongoConnect");
const port = process.env.PORT || 3000;
const cors = require("cors");
const User = require("./models/user");
const Validator = require('validatorjs');

const { auth } = require("express-openid-connect");

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(bodyParser.text({ limit: "200mb" }));

app.use(
  cors({
    origin: ["https://kim-quirk.github.io/cold-case", "http://localhost:8080"],
  })
);

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");

  

});

app.use((req, res, next) => {

  recordUser(req, res);
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  next();
});

 const recordUser = async (req, res) => {

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
    
    // If user does not exist in the database, create the user and store it.
    const newUser = new User ({

      name: req.oidc.user.name,
      email: req.oidc.user.email,
      picture: req.oidc.user.picture,
      creationDate: new Date(),
      lastLogin: new Date(),
      gamesCompleted: 0,
      highestScore: 0,
      isEmailVerified: req.oidc.user.email_verified
    });

    const newUserObject = newUser.toObject();

    let rules = ({

      name: 'required|string|min:3',
      email: 'required|email',
      picture: 'string',
      creationDate: 'required|date',
      lastLogin: 'required|date',
      gamesCompleted: 'required|integer|min:0',
      highestScore: 'required|integer|min:0',
      isEmailVerified: 'required|boolean'
    })

    
    let validator = new Validator(newUserObject, rules);



    try {
      if (validator.passes())
      {
        saveUserItem = await newUser.save();
        req.user = saveUserItem;
        console.log("User " + req.oidc.user.name + " created successfully!");
      }
      else
      {
        console.log(validator.errors);
        return;
      }
      
    } catch(err) {
      console.log("ERR: User was not created.")
      return;
    }

  }
}

// Use json and also require index file that will reference all other route files.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", require("./routes/index"));

mongodb.connectDB();

app.listen(port, () => console.log(`listening on PORT ${port}`));
