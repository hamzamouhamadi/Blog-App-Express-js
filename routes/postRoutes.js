const express = require("express")
const {getPosts,addPost,findPost,updatePost,deletePost} = require("../controllers/postController")
const middleware = require('../middleware/localAuth')
const isLogged = middleware.isLogged;
const router = express.Router();
///////////////////////////////////////////////////////////////
router.get('/',getPosts);
router.post('/',isLogged,addPost);
router.get('/:id',isLogged,findPost);
router.put('/:id',isLogged,updatePost);
router.delete('/:id',isLogged,deletePost);
///////////////////////////////////////////////////////////////
module.exports = router;