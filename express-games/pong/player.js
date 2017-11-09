var GameObject = require('./gameObject.js')
//util = require('util');


class Player extends GameObject{
  
  constructor(x,y, width, height, username){
    super(x, y, width, height);
    this.username = username;
    /*
    this.directions =  Object.freese({
      UP: Symbol("up"),
      DOWN: Symbol("down"),
      LEFT: Symbol("left"),
      RIGHT: Symbol("right"),
      NEUTRAL: Symbol("neutral")
    });
    */
    this.direction = 'neutral';
  }
  
  setDirection(direction){
    this.direction = direction;
  }
  
}



module.exports = Player;