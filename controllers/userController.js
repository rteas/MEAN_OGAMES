// File ./controllers/userController.js

var User = require('../models/user');
var Room = require('../models/room');
var async = require('async');

/*
router.get('/', userController.index);

// GET user info
router.get('/:id', userController.userInfo);

// Create user
router.post('/create', userController.createUser);

// Update user
router.put('/:id/update', userController.updateUser);

// Delete user
router.post('/:id/delete', userController.deleteUser);
*/

// Generic error handler used by all endpoints
function handleError(res, error){
    console.log("ERROR: " + error);
    res.status(500).json({"error": error});
}

exports.index = function(req, res){
    User.find()
    .sort({topScore: -1})
    .select('-password')
    .exec( function (err, users){
        if (err) { return handleError(res, err)}
        res.status(200).json(users);
    });
}

exports.createUser = function(req, res){
    // TODO: add error checking and sanitation of parameters
    
    // Check if the username doesn't already exist
    User.findOne({'username': req.body.username})
        .exec( function (err, user) {
           if (err) { return handleError(res, err); }
           if (!user) {
               var newUser = new User(
                    {
                        username: req.body.username, 
                        password: req.body.password,
                        location: req.body.location
                    });
                newUser.save(function(err){
                   if (err) { handleError(res, err); }
                   res.status(200).json(newUser);
                });
           }
           else{
               res.status(200).json(null);
           }
        });
    
}

exports.updateUserProfile = function(req,res){
    // TODO: create encrypted password for verification, also sanitize parameters
    
    User.findById(req.params.id, function(err, user){
        if (err) { handleError(res, err); }
            // Verify that username and password matches
            if(req.body.username === user.username){
                if(req.body.password === user.password){
                    // Verification process passed
                    
                    // If room changed, update room data as well
                    // remove the user from the room
                    if(req.body.location !== user.location){
                        Room.findByIdAndUpdate(user.location, function(err, room){
                         if (err) { handleError(res, err); }
                            for(var i = 0; i < room.roomPopulation.length; i++){
                               if(room.users[i] === req.params.id){
                                   room.splice(i,1);
                                   room.roomPopulation--;
                                   break;
                               }
                           }
                           room.save(function (err) {
                               if (err) { handleError(res, err); }
                           });
                        });
                    }
                    // Update the user's data
                    user.username = req.body.newUsername;
                    user.password = req.body.newPassword;
                    user.location = req.body.location;
                        
                    user.save(function (err) {
                       if (err) { handleError(res, err); } 
                    });
            
                }
            }
            res.json({'error': 'incorrect username or password'});
                
        });
        
}

exports.updateUserScore = function(req, res){
    User.findByIdAndUpdate(req.params.id, {topScore: req.body.topScore},
    function(err, user){
        if (err) { handleError(res, err); }
        res.status(200).json(user);
    })
}

exports.getUserInfo = function(req,res){
    /*
    User.findById(req.params.id, function(err, user){
        if (err) { handleError(res, err); }
        res.status(200).json(user);
    });
    */
    
    //TODO: remove password
    User.findById(req.params.id)
    .populate('friends')
    .exec(function(err, user){
       if (err) { handleError(res, err); }
       res.status(200).json(user);
    });
}

exports.addFriend = function(req, res){
    User.findById(req.params.id, function(err, user) {
        if (err) { handleError(res, err); }
        
        // Check if the friend does not exist already
        var friends = user.friends;
        for(var i = 0; i < friends.length; i++){
            if(friends[i].toString() === req.body.friend){
                res.status(200).json({status: "Friend already exists!"});
            }
        }
        
        user.friends.push(req.body.friend);
        
        user.save(function(err, user){
            if (err) { handleError(res, err); }
            res.status(200).json({ status: "Successfully added!" });
        });
    });
    
}

exports.removeFriend = function(req, res){
    User.findById(req.params.id, function(err, user) {
        if (err) { handleError(res, err); }
        var friends = user.friends;
        for(var i = 0; i < friends.length; i++){
            console.log(friends[i]);
            if(friends[i].toString() === req.body.friend){
                console.log('friend found');
                friends.splice(i,1);
            }
        }
        
        user.save(function(err){
            if (err) { handleError(res, err); }
            res.status(200).json({ status: 'success' });
        });
        
    });
}

exports.deleteUser = function(req, res){
    User.findByIdAndRemove(req.params.id, function(err){
        if (err) { handleError(res, err); }
        res.status(200).json({ status: 'success'});
    });
}

exports.verifyUser = function(req, res){
    //var user = req.body.user;
    User.findOne({'username': req.body.username, 'password': req.body.password}, function(err, user){
        if(err) { handleError(res, err); }
        res.status(200).json(user);
    });
}