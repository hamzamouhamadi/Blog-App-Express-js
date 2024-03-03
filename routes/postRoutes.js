const express = require("express")
const postController = require("../controllers/postController")
const middleware = require('../middleware/localAuth')
const isLogged = middleware.isLogged;
const isAdmin = middleware.isAdmin;
const router = express.Router();
///////////////////////////////////////////////////////////////
router.route('/')
    .get(postController.getPosts)
    .post(isLogged,postController.addPost);
router.route('/:id')
    .get(isLogged,postController.findPost)
    .put(isLogged,postController.updatePost)
    .delete(isLogged,postController.deletePost);
//For Admin
router.get('/admin',isAdmin,isLogged,postController.getAllPosts);
///////////////////////////////////////////////////////////////
module.exports = router;