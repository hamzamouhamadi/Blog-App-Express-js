const express = require("express")
const {getPosts,addPost,findPost,updatePost,deletePost} = require("../controllers/postController")

const router = express.Router();
///////////////////////////////////////////////////////////////
router.get('/',getPosts);
router.post('/',addPost);
router.get('/:id',findPost);
router.put('/:id',updatePost);
router.delete('/:id',deletePost);
///////////////////////////////////////////////////////////////
module.exports = router;


