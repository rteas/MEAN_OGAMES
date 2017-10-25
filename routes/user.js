// ./routes/user.js - User route module

var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');

// GET: Users index
router.get('/', userController.index);

// GET: user info
router.get('/:id', userController.getUserInfo);

// POST: user login
router.post('/login', userController.loginUser);

// POST: user logout
router.post('/logout', userController.logoutUser);

// POST: Create user
router.post('/create', userController.createUser);

// PUT: Update user profile
router.put('/:id/updateProfile', userController.updateUserProfile);

// PUT: update user score
router.put('/:id/updateScore', userController.updateUserScore);

// PUT: Add user friend
router.put('/:id/addFriend', userController.addFriend);

// PUT: Remove user friend
router.put('/:id/removeFriend', userController.removeFriend);

// POST: Delete user
router.post('/:id/delete', userController.deleteUser);

module.exports = router;