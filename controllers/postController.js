const Post = require('../model/post')
//////////////////////////////////////////////////////
const getPosts = async (req,res)=>{
  try {
    let posts = await  Post.find().populate('authorId', 'username -_id')
    res.status(200).json(posts);
  } catch (error) {
    res.sendStatus(500).json({message : "Error with fetching posts"})
  }
  
}
//////////////////////////////////////////////////////
const findPost = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findById(id);
        if (post) {
            res.json(post);
        } else {
            res.status(404).send("Post not found");
        }
    } catch (error) {
        res.status(500).send("Error fetching post");
    }
}

//////////////////////////////////////////////////////
const addPost = async(req,res)=>{
    try {
        let {title,content,category} =req.body
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
const updatePost = async (req,res)=>{
    try {
        const id = req.params.id;
        let {title,content,category} =req.body
        let post = await Post.findByIdAndUpdate(id,{$set:{
            title,
            content,
            category,
        }})
        res.send(post)
    } catch (error) {
        res.status(406).send("Problem with updating your post")
    }
}
//////////////////////////////////////////////////////
const deletePost = async (req,res)=>{
    try {
        const id =  req.params.id;
        await Post.findByIdAndDelete(id)
        res.status(200).send('Post deleted !')
    } catch (error) {
        res.status(406).send("Problem with deleting your post")
    }
}
//////////////////////////////////////////////////////
module.exports = {
    getPosts,
    addPost,
    findPost,
    updatePost,
    deletePost
}