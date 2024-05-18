var express = require('express');
var router = express.Router();
const {signUp, isPaidUser, saveDetails, getDetails, signIn, addSong, updateProfile, getAllUsers, blockUser, getUserById, validAdmin, logInMsg, LogOut} = require('../controllers/user-controller');
const isAdmin = require('../middlewares/isAdmin');
const isLoggedIn = require('../middlewares/isLoggedIn');

router.post('/signup',signUp);
router.post('/signIn',signIn);
router.post('/onboarding',isLoggedIn,saveDetails)
router.get('/payment',isLoggedIn,isPaidUser)
router.post('/profile/:username',getDetails)
router.post('/updateProfile',isLoggedIn,updateProfile)
router.get('/users',isLoggedIn,getAllUsers)
router.post('/blockUser',isLoggedIn,blockUser)
router.get('/getUserById/:id',getUserById)
router.post('/isValidAdmin',isLoggedIn,isAdmin,validAdmin)
router.post('/addSong',isLoggedIn,addSong)
router.get('/isLoggedIn',isLoggedIn,logInMsg)
router.get('/logout',LogOut)
module.exports = router;
