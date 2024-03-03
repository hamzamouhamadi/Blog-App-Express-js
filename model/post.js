const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title :{type : String , required : true},
    content :{type : String , required : true},
    authorId :{type : mongoose.Schema.Types.ObjectId ,ref : 'User'},
    publicationDate : {type : Date , default : Date.now()},
    lastModified : {type : Date , default : Date.now()},
    category : {type : String , required : true}
    //views : {},
    //likes :{},
    //comments :{}
})

const Post = mongoose.model(  "Post" , PostSchema)

module.exports = Post