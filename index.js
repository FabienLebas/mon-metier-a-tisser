const express = require('express');
const app = express();
const path = require("path");

const port = process.env.PORT || 3000;

app.use("/static", express.static('build/static'));

app.get("/favicon.ico", function (req, res) {
  res.sendFile(path.join(__dirname, "./build/favicon.ico"));
});

app.get("/robots.txt", function (req, res) {
  res.sendFile(path.join(__dirname, "./build/robots.txt"));
});

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

app.get("*", function (request, result) {
  result.sendFile(__dirname + "/build/index.html");
});

app.listen(port, function () {
  console.log("Server listening on port:" + port);
});
