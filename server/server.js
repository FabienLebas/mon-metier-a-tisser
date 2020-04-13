const express = require('express');
const app = express();
const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;

const users = require('./users.js');
const getUsers = require('./api/getUsers.js');
const createNewUser = require('./api/createNewUser.js');

const port = process.env.PORT || 4000;

app.use(function(request, result, next) {
    const allowedOrigins = [
      'http://localhost:3000',
      'https://localhost:3000',
      'https://mon-metier-a-tisser.appspot.com',
      'http://mon-metier-a-tisser.appspot.com'
     ];
    const origin = request.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
        result.setHeader('Access-Control-Allow-Origin', origin);
        result.setHeader('Access-Control-Allow-Credentials', true);
    };
    result.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    result.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, x-api-key, Accept, token"); // Needed by ExpressJS
    request.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, x-api-key, Accept, token");
    next();
});

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new LocalStrategy(
  function(username, password, cb) {
    users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password !== password) { return cb(null, false);}
      return cb(null, user);
    });
  }));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, callback) {
  return callback(null, user.id);
});

passport.deserializeUser(function(id, callback) {
  return users.findById(id).then(user=>{
    callback(null, user)
  });
});

const bodyParser = require('body-parser')
app.use(bodyParser.json()); // for parsing application/json

app.use(require("cookie-parser")());
app.use(require('express-session')({ secret: process.env.passportSecret, resave: false, saveUninitialized: false }));

app.listen(port, function () {
  console.log("Server http listening on port:" + port);
});

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    const userInfo = {
      status: '200',
      username: req.body.username
    }
    res.send(userInfo)
  }
);

app.put('/login', function(request, result){
  createNewUser(request.body.username, request.body.password)
  .then(userInfo => result.send({
    status: '200',
    username: request.body.username
  }))
});

app.get("/users", function(request, result){
  getUsers()
  .then(data => result.send(data))
})

app.get("/", function(request, result){
  result.send("Welcome on the api root")
})
