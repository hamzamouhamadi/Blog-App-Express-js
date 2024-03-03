const passport = require('passport');
const bcrypt = require('bcrypt')
const User = require('../model/user')
//////////////////////////////////////////////////////////////////////
// Route to handle user login
const register = async (req, res) => {
  let {username, email,password,fullName,dateOfBirth,role} = req.body
  try {
    let hashedPass = await bcrypt.hash(password,  10);
    const user = await User.create({ 
      username: username ,
      email : email,
      password : hashedPass,
      fullName : fullName,
      dateOfBirth : dateOfBirth,
      role : role})
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

//////////////////////////////////////////////////////////////////////
//Route of Login
// In your controller

const login = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/login',
    failureFlash : false,
  })(req, res, next);
};
//////////////////////////////////////////////////////////////////////
// Get one user
const getUser = async (req,res)=>{
  try {
    let _id = req.user._id
    let user = await User.findOne({_id})
    res.send(user)
  } catch (error) {
    console.log('Problem to get user');
  }
}
//////////////////////////////////////////////////////////////////////
//Get all users
const getAll = async(req, res) => {
    try {
      let users = await User.find({})
      res.send(users);
    } catch (error) {
      res.sendStatus(403);
    }
};
//////////////////////////////////////////////////////////////////////
//Route of  Update Profile
const updateUser = async (req, res) => {
    let ID = req.user._id
    let {username,email,password,fullName,dateOfBirth,role} = req.body
    try {
        let hashedPass = await bcrypt.hash(password,  10);

        let userUpdated =  await User.updateOne({_id : ID},{$set:{
          username: username ,
          email : email,
          password : hashedPass,
          fullName : fullName,
          dateOfBirth : dateOfBirth,
          role : role}})
        res.send(userUpdated);
      } catch (err) {
        res.status(500).send(err);
      }
  };
//////////////////////////////////////////////////////////////////////
// Log out Route
 const logout =(req,res)=>{
   try {
    req.session.destroy();
    res.send('You loged out')
   } catch (error) {
      res.send(error);
   }
 }

module.exports = {register,login,getUser,logout,getAll,updateUser}