var HashMap = require('hashmap');
var GameManager = require('./express-games/gameManager');

class SocketManager{
    
    constructor(io){
        this.io = io;
        this.userSocketMap = new HashMap();
        this.userRoomMap = new HashMap();
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
        // add listeners to socket
        // get game selected players
        var room = this.userRoomMap.get(socket.username);
        var game = this.gameManager.getGame(room);
        
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
            this.io.to(socket.room).emit('play');
            game.switchState(game.states.PLAY);
        });
        
        socket.on('play-input', (data) => {
            var game = this.gameManager.getGame(socket.room);
            // update player locations
            console.log(data);
            console.log(data.side);
            //game.setPlayerPosition(data.position.x, data.position.y, data.side);
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
        
        socket.on('hax', ()=> {
            this.io.to(socket.room).emit('hax');
        })
        
        
        socket.on('get-state', ()=>{
            var game = this.gameManager.getGame(socket.room);
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
            socket.emit('sync-state', sendData);
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