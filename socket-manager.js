var HashMap = require('hashmap');


class SocketManager{
    
    constructor(){
        this.userSocketMap = new HashMap();
    }
    
    addSocket(username, socket){
        this.userSocketMap.set(username, socket);
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
    
}

module.exports = SocketManager;