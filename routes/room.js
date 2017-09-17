// ./routes/room.js - User route module

var express = require('express');
var router = express.Router();

var roomController = require('../controllers/roomController');

// GET: Room index
router.get('/', roomController.index);

// GET: room info
router.get('/:id', roomController.roomInfo);

// POST: Create room
router.post('/create', roomController.create);

// PUT: Update room
//router.put('/:id/update', roomController.updateRoom);

// POST: Delete room
//router.post('/:id/delete', roomController.deleteRoom);

// PUT: Add user to a room
router.put('/:id/addUser', roomController.addUser);

// PUT: Remove user from a room
router.put('/:id/removeUser', roomController.removeUser);

// PUT: removes nulls, only for development purposes
router.put('/:id/removeNulls', roomController.removeNulls);

module.exports = router;