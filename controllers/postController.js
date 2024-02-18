const postModel = require("../model/post")
const posts = postModel.getAllPosts();
//////////////////////////////////////////////////////
const getPosts = (req,res)=>{
  res.json(posts);
}
//////////////////////////////////////////////////////
const findPost = (req,res)=>{
    const id =  req.params.id;
    const post= posts.find((post) => post.id == id );
    if(post){ 
        res.send(post)
    }else{
        res.send("User not found")
    }
}
//////////////////////////////////////////////////////
const addPost = (req,res)=>{
    let id = posts.length +1
    let newPost = {
        id: id,
        name: req.body.name ,
        title: req.body.title
        }; 
    posts.push(newPost); 
    postModel.writePosts(posts);
    res.status(201).json(newPost);
}
//////////////////////////////////////////////////////
const updatePost = (req,res)=>{
    const id = req.params.id;
    const index = posts.findIndex((post) => post.id == id);

        let updatedPost = {
        id: id,
        name: req.body.name ,
        title: req.body.title
        };
        posts[index] = updatedPost;
        postModel.writePosts(posts);
        res.send("Post Updated");
}
//////////////////////////////////////////////////////
const deletePost = (req,res)=>{
    const id =  req.params.id;
    const index = posts.findIndex((post)=> post.id==id);
    posts.splice(index,   1);
    postModel.writePosts(posts);
    res.status(204).send("Deleted");
}
//////////////////////////////////////////////////////
module.exports = {
    getPosts,
    addPost,
    findPost,
    updatePost,
    deletePost
}