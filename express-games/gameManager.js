// express-games/gameManager.js
// stores game instance for each room
var HashMap = require('hashmap');
class GameManager{
  
  constructor(){
    this.gameMap = new HashMap();
  }
  
  // starts a new game if it isn't
  // already initialized
  startGame(room, game){
    if(!this.getGame()){
      this.addGame(room, game);
      game.start();
    }
  }
  
  changeGame(room, game){
    this.gameMap.set(room, game);
  }

  getGame(room){
    return this.gameMap.get(room);
  }
  
  getGameData(room){
    return this.gameMap.get(room).getData();
  }
}

module.exports = GameManager;