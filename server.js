const express = require("express");
const app = express();
const mongodb = require("./db/connect");
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

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

app.get("/user", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

// Use json and also require index file that will reference all other route files.
app.use(express.json());

app.use('/', require('./routes/index'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
