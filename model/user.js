const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username : {type : String , required : true},
    email :{type : String , required : true, unique : true},
    password :{type : String , required : true},
    fullName :{type : String , required : true},
    dateOfBirth :{type : Date , required : true},
    bio : {type : String},
    registration_Date :{ type :Date , default : Date.now()},
    isAdmin :{type : Boolean , required : true , default : false}
})

const User = mongoose.model( "User", userSchema );

module.exports = User ;