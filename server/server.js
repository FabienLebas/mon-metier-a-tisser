const express = require('express')
const app = express()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

const port = process.env.PORT || 4000;

app.use(function(request, result, next) {
    const allowedOrigins = [
      'http://localhost:3000',
      'https://localhost:3000',
      'http://localhost:4000',
      'https://localhost:4000',
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

app.post('/login', passport.authenticate('local', { successRedirect: '/',
                                                    failureRedirect: '/login' }));

app.get("/", function(request, result){
  result.send("Welcome on the api root")
})

app.listen(port, function () {
  console.log("Server http listening on port:" + port);
});
