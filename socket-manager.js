var HashMap = require('hashmap');
var GameManager = require('./express-games/gameManager');

class SocketManager{
    
    constructor(){
        this.userSocketMap = new HashMap();
        this.userRoomMap = new HashMap();
        this.gameManager = new GameManager();
        this.ioInstance = false;
    }
    
    setIO(io){
        this.io = io;
        this.ioInstance = true;
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
    
    addUserToRoom(username, room){
        // if this is the first instance, make a
        // game room
        this.userRoomMap.set(username, room);
    }
    
    removeUserFromRoom(username, room){
        
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
        console.log(socket);
        // add listeners to socket
        // get game selected players
        var room = this.userRoomMap.get(socket.username);
        var game = this.gameManager.getGame(room);
        
        socket.on('select-player', (data)=> {
          if(game.addPlayer(data.side)){
              // emit selected players
              socket.to(room).emit('player-selected', data);
              socket.emit('select-results', {success: true});
          }
          else{
              socket.emit('select-results', {success: false});
          }
        });
        
        socket.on('play', ()=>{
            var game = this.gameManager.getGame(socket.room);
            game.switchState(game.states.PLAY);
        });
        
        socket.on('update-player', (data)=>{
            console.log(data);
        })
        
        socket.on('close', ()=>{
            this.gameManager.deleteGame(socket.room);
        })
        
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