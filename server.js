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

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;
var server;
var io

var roomMap = new HashMap();

// Connect to the database before starting the application server.
mongo.connect('mongodb://rteas:1467620m@ds111882.mlab.com:11882/heroku_s1wj5n8w', { useMongoClient: true } , function (err, database) {
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
  
  io.on('connection', function(socket){
    
    io.emit('greetings', 'hi');
    console.log('user connected');
    
    socket.on('join room', (roomname) => {
      console.log('joining room...',roomname);
      socket.join(roomname);
      console.log('User has joined room: ' + roomname);
      socket.in(roomname).emit(roomname, 'welcome to room ' + roomname+"!");
    });
    
    socket.on('message', (msg) => {
      console.log('message sending:',msg);
      io.emit('message', msg);
    });
    
    socket.on('disconnect', function(){
        
       if(socket.username){
         console.log(socket.username, 'disconnected');
         userSocketMap.delete(socket.username);
         io.emit('disconnect', socket.username);
         userSocketMap.forEach((socket, username) => {
          console.log(username); 
        });
       }
       
       
    });
    
    socket.on('user-login', (username)=>{
      socket.username = username;
      userSocketMap.set(username, socket);
      io.emit('user-login', socket.username);
      console.log('user: '+username+' conneted!');
      userSocketMap.forEach((socket, username) => {
        console.log(username); 
      })
    });
    
    socket.on('chat-message', function(msg){
        io.emit('msg', msg);
    });
    
    socket.on('room-message', function(data){
      console.log("room-msg:");
      console.log(data);
      io.to(data.room).emit('message', data.message);
    });
  });
  
});

app.get('/jquery/jquery.js', function(req, res) {
    res.sendfile(__dirname + '/node_modules/jquery/dist/jquery.min.js');
});
