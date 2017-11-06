var GameObject = require('./gameObject.js')
//util = require('util');

class Player extends GameObject{
  
  constructor(x,y, width, height, side){
    super(x, y, width, height);
    this.side = side;
  }
  

}



module.exports = Player;