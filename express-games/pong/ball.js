var GameObject = require('./gameObject.js')
//util = require('util');

class Ball extends GameObject{
  
  constructor(x,y, radius){
    super(x, y, radius, radius);
  }
  

}

module.exports = Ball;