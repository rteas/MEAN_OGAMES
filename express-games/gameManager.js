// express-games/gameManager.js
// stores game instance for each room
var HashMap = require('hashmap');

class GameManager{
  
  constructor(){
    this.gameMap = new HashMap();
  }
  
  // Adds & starts a game room
  // if it isn't already initialized
  addGameRoom(room, game){
    if(!this.gameMap.has(room)){
      this.gameMap.set(room, game);
      game.start();
    }
  }
  
  changeGame(room, game){
    this.deleteGame(room);
    this.gameMap.set(room, game);
  }

  getGame(room){
    return this.gameMap.get(room);
  }
  
  deleteGame(room){
    var game = this.gameMap.get(room);
    if(game){
      game.stop();
    }
  }
  
  removeGameRoom(room){
    this.deleteGame(room);
    this.gameMap.delete(room);
  }
}

module.exports = GameManager;