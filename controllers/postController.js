const Post = require('../model/post')
//////////////////////////////////////////////////////
const getPosts = async (req,res)=>{
  try {
    let posts = await  Post.find().populate('authorId')
    res.status(200).json(posts);
  } catch (error) {
    res.sendStatus(402).json({message : "You are not authenticated"})
  }
  
}
//////////////////////////////////////////////////////
const findPost = (req,res)=>{
    const id =  req.params._id;
    const post= Post.find(id);
    if(post){ 
        res.send(post)
    }else{
        res.status(404).send("Post not found")
    }
}
//////////////////////////////////////////////////////
const addPost = async(req,res)=>{
    let {title,content,category} =req.body
    try {
        let post = await Post.create({
            title,
            content,
            category,
            authorId: req.user._id
        })
        res.send(post)
    } catch (error) {
        res.status(406).send("Problem with adding your post")
    }
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
        postModel.writePosts(posts); // Write the entire updated posts array
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