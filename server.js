var express = require("express");
var bodyParser = require("body-parser");
//var mongo = require("mongodb");
var mongo = require("mongoose");
var Schema = mongo.schema;
//var ObjectID = mongo.ObjectID;

var socketio = require('socket.io');

//var http = require('http');

var USER_COLLECTION = "users";
var ROOM_COLLECTION = "rooms";

var DISCONNECTION_TIMER = 15000;

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

var HashMap = require('hashmap');

var userSocketMap = new HashMap();
var users = require('./routes/user');
var rooms = require('./routes/room');
app.use('/api/users', users);
app.use('/api/rooms', rooms);
var request = require('request');

var User = require('./models/user');

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;
var server;
var io;

// test game
var Player = require('./express-games/pong/player');

/*
var player = new Player(0,0,1,1);
player.printPosition();
player.setPosition(20,1);
player.printPosition();
*/

var GameManager = require('./express-games/gameManager');
var gameManager = new GameManager();

var PongGame = require('./express-games/pong/pongGame');

/*
var pongGame = new PongGame();

gameManager.addGameRoom('1', pongGame);

var game = gameManager.getGame('1');

//console.log(pongGame.states);

//setTimeout(() => { gameManager.deleteGame('1')}, 5000);
*/

// socket manager class
var SocketManager = require('./socket-manager');


// Connect to the database before starting the application server.
mongo.connect('mongodb://public_user:test@ds111882.mlab.com:11882/heroku_s1wj5n8w', { useMongoClient: true } , function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on " + process.env.IP +":"+ process.env.PORT);
  });
  
  // setup socket.io
  io = socketio.listen(server);
  var socketManager = new SocketManager(io);
  
  
  io.on('connection', function(socket){
    
    // reobtain user-login from client if it exists
    socket.emit('get-login-data', 'login-data');
    
    // send an event for client to send a username
    // if applicable (only in games)
    socket.emit('get-client-data', 'get data');
    
    socket.on('user-login', (username)=>{
      var oldSocket = socketManager.getUser(username);
      
      // if it has a running disconnect timer, remove it
      if(oldSocket){
        
        if(oldSocket.disconnectionTimer){
          clearTimeout(oldSocket.disconnectionTimer);
          console.log('cleared timeout!');
        }
        
        if(oldSocket.id !== socket.id){
          socketManager.removeSocket(username);
          oldSocket.disconnect();
        }
        else{
          return;
        }
      }
      
      socket.username = username;
      socketManager.addSocket(username, socket);
      
      io.emit('info', socket.username + " connected.");
      console.log('user: '+username+' conneted!');
      
    });
    
    socket.on('disconnect', () => {
      console.log('starting timeout');
      // Start a timer function
      // that does an 'official' disconnection
      // or the assumption that a user has left
      // after a certain period of time
      socket.disconnectionTimer = setTimeout(()=> {
        if(socket.username){
         console.log(socket.username, 'disconnected');
         // userSockets.removeSocket(socket.username);
         io.emit('info', socket.username + " disconnected");
         
         // Method 1
         // make server call to logout user
         /*
         request.post('http://slots-party-rteas-1.c9users.io:8080/api/users/logout', 
                      { json:
                        { username: socket.username }
                      },
                      function(err, res, body){
                        if(err) console.log("error: "+'api/users/logout');
                      });
          */
          
          // Method 2, change the user status directly in the db
          User.findOne({'username': socket.username}, function(err, user){
            if(err) { return; }
            
            if(!user){
                return;
            }
            
            if(user.status === "Online"){
                user.status = "Offline";
            }
            
            user.save((err) => {
                if(err) { return; }
                
                return;
            });
          });
        }
      }, 
        DISCONNECTION_TIMER
      );
       
       
    });
    
  });
  
  // Test namespace
  var testNamespace = io.of('/testnamespace');
  
  testNamespace.on('connection', function(socket){
    console.log('joined testnamespace!');
    
    socket.on('join room', (roomname) => {
      console.log('joining room...',roomname);
      socket.join(roomname);
      console.log('User has joined room: ' + roomname);
      socket.in(roomname).emit(roomname, 'Room message here!');
    });
    
  });
  
});

app.get('/jquery/jquery.js', function(req, res) {
    res.sendfile(__dirname + '/node_modules/jquery/dist/jquery.min.js');
});
