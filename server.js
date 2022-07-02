const express = require("express");
const app = express();
const mongodb = require("./db/mongoConnect");
const { requiresAuth } = require("express-openid-connect");
const port = process.env.PORT || 3000;
const cors = require("cors");

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

app.use(cors({
  origin: ['https://kim-quirk.github.io/cold-case', 'http://localhost:8080']
}))

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
})

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
app.use('/', require('./routes/index'));

mongodb.connectDB();

app.listen(port, () =>
console.log(`listening on PORT ${port}`));
