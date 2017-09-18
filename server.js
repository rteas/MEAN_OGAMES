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
       console.log(socket.username, 'disconnected'); 
       userSocketMap.delete(socket.username);
       io.emit('disconnect', socket.username);
       userSocketMap.forEach((socket, username) => {
        console.log(username); 
      })
       
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


// USER API ROUTES BELOW

/*
// Generic error handler used by all endpoints
function handleError(res, reason, message, code){
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

/* 'api/contacts'
* GET: finds all contacts
* POST: creates a new contact
*/

/*
app.get("/api/users", function(req,res){
    db.collection(USER_COLLECTION).find({}).toArray(function(err, docs){
        if (err) {
            handleError(res, err.message, "failed to get contacts");
        }
        else{
            res.status(200).json(docs);
        }
    })
});

app.post("/api/users", function(req, res){
    var newContact = req.body;
    
    if (!req.body.name){
        handleError(res, "invalid user  input", "must provide a name.", 400);
    }
    
    db.collection(USER_COLLECTION).insertOne( newContact, function (err, doc) {
        if (err) {
            handleError(res, err.message, 'failed to create new contact.');
        }
        else{
            res.status(201).json(doc.ops[0]);
        }
    });
});
*/


/* '/api/contacts/:id'
* GET: find the contact by id
* PUT: update the contact by id
* DELETE: deletes the contact by id
*/

/*
app.get("/api/users/:id", function(req, res) {
  db.collection(USER_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/users/:id", function(req, res) {
  var updateDoc = req.body;
  // delete updateDoc._id;

  db.collection(USER_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update contact");
    } else {
      // updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/users/:id", function(req, res) {
  db.collection(USER_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete contact");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});
*/