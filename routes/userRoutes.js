const express = require("express")
const userController = require('../controllers/userController')
const middleware = require('../middleware/localAuth')
const isLogged = middleware.isLogged;
const isAdmin = middleware.isAdmin;
const router = express.Router();
///////////////////////////////////////////////////////////////
router.post('/register',userController.register);
router.post('/login',userController.login);
router.post('/logout',isLogged,userController.logout);
router.route('/profile')
    .get(isLogged,userController.getUser)
    .put(isLogged,userController.updateUser)
    .delete(isLogged,userController.deleteUser);
//For Admin
router.get('/',isAdmin,isLogged,userController.getAll);
///////////////////////////////////////////////////////////////
module.exports = router;