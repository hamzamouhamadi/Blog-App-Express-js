const express = require('express');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../model/user')
//////////////////////////////////////////////////////////////////////
const app = express();
app.use(express.json())
//////////////////////////////////////////////////////////////////////
// Configure session middleware
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));
//////////////////////////////////////////////////////////////////////
// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());
//////////////////////////////////////////////////////////////////////
// Sample user database

//////////////////////////////////////////////////////////////////////
// Configure Passport local strategy for authentication
passport.use(new LocalStrategy(
  async function(username, password, done) {
    try {
      let user = await User.findOne({username})
      if (!user) {
        return done(null, false, { message: 'User not found' });
      }
      let isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch){
        return done(null,false,{message:'Wrong Password!'});
      }
      done(null, user); // Successful login
    } catch (error) {
      done(null,false,{message : error}); 
    }
  }
));
//////////////////////////////////////////////////////////////////////
// Serialize user object to store in the session
passport.serializeUser((user, done) => {
  done(null, user);
});
//////////////////////////////////////////////////////////////////////
// Deserialize user object from the session
passport.deserializeUser((user, done) => {
  //const user = User.findById({_id : id});
  done(null, user);
});

 function isLogged(req, res, next) {
    if (req.user) {
        return next();
    } else {
        res.sendStatus(401);
    }
}

module.exports = {
  app : app,
  isLogged: isLogged
};

