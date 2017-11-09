var HashMap = require('hashmap');
var GameManager = require('./express-games/gameManager');

class SocketManager{
    
    constructor(){
        this.userSocketMap = new HashMap();
        this.roomSocketMap = new HashMap();
        this.gameMap = new GameManager();
    }
    
    addUserToRoom(username, room){
        this.roomSocketMap
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
    }
    
    removePongGameListeners(username){
        // get socket
        let socket = this.userSocketMap.get(username);
        // remove listeners from socket
    }
    
    print(){
        this.userSocketMap.forEach((socket, username) => {
          console.log(username); 
        });
    }
    
    removeSocket(username){
        this.userSocketMap.delete(username);
    }
    
}

module.exports = SocketManager;