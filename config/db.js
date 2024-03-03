const mongoose = require('mongoose');
require('dotenv').config();


const connetDB = async ()=>{
    try {
        mongoose
    .connect(process.env.MONGODB_URIURI)
    .then(()=> console.log("Database Connected with successfully"))
    .catch((err)=>console.log(err));
    } catch (error) {
        console.log("Error with connecting to data base",error);
    }
}

module.exports = connetDB;
