var HashMap = require('hashmap');
var GameManager = require('./express-games/gameManager');
var PongGame = require('./express-games/pong/pongGame');

class SocketManager{
    
    constructor(io){
        this.io = io;
        // key: username, value: socket
        this.userSocketMap = new HashMap();
        // key: user, value: room
        this.userRoomMap = new HashMap();
        // key: room, value: an array containing usernames
        this.roomUsersMap = new HashMap();
        this.gameManager = new GameManager();
        this.ioInstance = false;
    }
    
    setIO(io){
        this.io = io;
        this.ioInstance = true;
    }
    
    hasGame(room){
        return this.gameManager.hasGame(room);
    }
    
    getRoom(username){
        return this.userRoomMap.get(username);
    }
    
    removeRoom(room){
        
    }
    
    removeGame(room){
        this.gameManager.deleteGame(room);
    }
    
    addGameToRoom(room, game){
        this.gameManager.addGameRoom(room, game);
    }
    
    changeRoomGame(room, game){
        this.gameManager.changeGame(room, game);
    }
    
    addUser(username, socket){
        this.userSocketMap.set(username, socket);
    }
    
    addUserToRoom(username, room){
        // if this is the first instance, make the room
        if(!this.roomUsersMap.has(room)){
            this.addRoom(room);
        }
        
        // update the room
        var users = this.roomUsersMap.get(room);
        users.push();
        
        // update the user
        this.userRoomMap.set(username, room);
    }
    
    addRoom(room){
        var emptyArray = [];
        this.roomUsersMap.set(room, emptyArray);
    }
    
    // removes user from room and clears user 
    // room data
    // also removes the room (and game) if the room is empty
    removeUserFromRoom(username){
        this.userRoomMap.delete(username);
        var room = this.userRoomMap.get(username);
        if(room){
            var users = this.roomUsersMap.get(room);
            
            var index = users.indexOf(username);
            
            if(index >= 0){
               users.splice(index, 1); 
            }
            
            if(users.length === 0){
                this.gameManager.deleteGame(room);
            }  
        }
        
    }
    
    addSocket(username, socket){
        this.userSocketMap.set(username, socket);
    }
    
    
    
    addChatListeners(username){
        let socket = this.userSocketMap.get(username);
    }
    
    addPongGameListeners(username){
        // get socket
        let socket = this.userSocketMap.get(username);
        // add listeners to socket
        // get game selected players
        var room = this.userRoomMap.get(socket.username);
        if(!room) { console.log('no room exists'); return; }
        
        var game = this.gameManager.getGame(room);
        if(!game)  { console.log('no game exists'); return; }
        
        socket.on('select-player', (data)=> {
          
          var gameInstance = this.gameManager.getGame(socket.room);
          
          // successful player selection
          if(gameInstance.addPlayer(data.username, data.side)){
              var sendData = { success: true, player: data };
              this.io.to(socket.room).emit('selection-results', sendData);
          }
          // unsuccessful player selection
          else{
              socket.emit('selection-results', {success: false });
          }
        });
        
        socket.on('play', ()=>{
            var game = this.gameManager.getGame(socket.room);
            console.log('play state initialized');
            this.io.to(socket.room).emit('play');
            game.switchState(game.states.PLAY);
            console.log('game state: '+game.state);
            
        });
        
        socket.on('play-input', (data) => {
            var game = this.gameManager.getGame(socket.room);
            // update player locations
            // console.log(data);
            game.updatePlayerLocation(data.position.x, data.position.y, data.side, data.direction);
            
        });
        
        socket.on('update-lobby-input', (data) => {
            var game = this.gameManager.getGame(socket.room);
            var data = game.getLobbyData();
            this.io.to(socket.room).emit('lobby-data', data);
        });
        
        socket.on('update-lobby-data', (data)=>{
            console.log(data);
        });
        
        socket.on('restart', ()=>{
           var game = this.gameManager.getGame(socket.room);
           //console.log(game);
           game.restartGame();
           //game.restart();
           this.io.to(socket.room).emit('restart');
        });
        
        socket.on('close', ()=>{
            this.gameManager.deleteGame(socket.room);
        });
        
        socket.on('re-initialize', ()=> {
            this.gameManager.deleteGame(socket.room);
            var newGame = new PongGame(this.io, socket.room);
            this.gameManager.addGameRoom(socket.room, newGame);
            this.gameManager.startGame(socket.room);
            this.io.to(socket.room).emit('restart', '');
        });
        
        socket.on('hax', ()=> {
            this.io.to(socket.room).emit('hax');
        });
        
        
        socket.on('get-sync', ()=>{
            console.log('sync called');
            var game = this.gameManager.getGame(socket.room);
            if(!game) return;
            var state = game.state;
            console.log(state);
            // lobby and play state
            var stateData;
            var gameData;
            if(state === game.states.LOBBY){
                stateData = 'lobby';
                gameData = game.getPlayersData();
            }
            else if(state === game.states.PLAY){
                stateData = 'play';
                gameData = game.getPlayersData();
            }
            else{
                stateData = 'end';
                gameData = '';
            }
            var sendData = { state: stateData, gameData: gameData };
            socket.emit('sync', sendData);
        });
        
        socket.on('sync-lobby', ()=> {
            var game = this.gameManager.getGame(socket.room);
            this.io.to(socket.room).emit('sync-lobby-data', game.getLobbyData);
        });
        
        socket.on('sync-play', () => {
            var game = this.gameManager.getGame(socket.room);
            this.io.to(socket.room).emit('sync-play-data', game.getPlayData);
        });
        
    }
    
    initializeSocket(username){
        var socket = this.userSocketMap.get(username);
        
    }
    
    
    
    selectPlayer(socket, data){
        
    }
    
    pongSelect(data){
        
    }
    
    pongInput(data){
        console.log(data);
    }
    
    removePongGameListeners(username){
        // get socket
        let socket = this.userSocketMap.get(username);
        
        // remove listeners from socket
        /*
        socket.removeListener('select-player');
        socket.removeListener('play');
        */
    }
    
    print(){
        this.userSocketMap.forEach((socket, username) => {
          console.log(username); 
          //console.log(this.userSocketMap.get(username));
        });
    }
    
    removeSocket(username){
        this.userSocketMap.delete(username);
    }
    
}

module.exports = SocketManager;