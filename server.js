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

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;
var server;
var io

var roomMap = new HashMap();

// test sockets class
var SocketManager = require('./socket-manager.js');
var userSockets = new SocketManager();

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
  io.on('connection', function(socket){
    
    io.emit('greetings', 'hi');
    console.log('user connected');
    
    socket.on('join room', (roomname) => {
      console.log('joining room...', roomname);
      socket.join(roomname);
      console.log('User has joined room: ' + roomname);
      socket.in(roomname).emit(roomname, 'welcome to room ' + roomname+"!");
    });
    
    socket.on('message', (msg) => {
      console.log('message sending:', msg);
      io.emit('message', msg);
    });

    socket.on('chat-message', function(msg){
        io.emit('msg', msg);
    });
    
    socket.on('room-message', function(data){
      
      console.log("room-msg:");
      console.log(data);
      io.to(data.room).emit('message', data.message);
      
    });    
    
    socket.on('user-login', (username)=>{
      
      socket.username = username;
      userSockets.addSocket(username, socket);
      io.emit('info', socket.username + " connected.");
      console.log('user: '+username+' conneted!');
      userSockets.print();
      
    });
    
    socket.on('disconnect', () => {
        
       if(socket.username){
         console.log(socket.username, 'disconnected');
         userSockets.removeSocket(socket.username);
         io.emit('info', socket.username + " disconnected");
         
         // make server call to logout user
         request.post('http://slots-party-rteas-1.c9users.io:8080/api/users/logout', 
                      { json:
                        { username: socket.username }
                      },
                      function(err, res, body){
                        if(err) console.log(err);
                      });
       }
       
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
