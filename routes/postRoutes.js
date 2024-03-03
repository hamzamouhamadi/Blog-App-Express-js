const express = require("express")
const {getPosts,addPost,findPost,updatePost,deletePost} = require("../controllers/postController")
const middleware = require('../middleware/localAuth')
const isLogged = middleware.isLogged;
const router = express.Router();
///////////////////////////////////////////////////////////////
router.get('/',getPosts);
router.post('/',isLogged,addPost);
router.get('/:id',findPost);
router.put('/:id',updatePost);
router.delete('/:id',deletePost);
///////////////////////////////////////////////////////////////
module.exports = router;