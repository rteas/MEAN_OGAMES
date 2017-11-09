var GameObject = require('./gameObject.js')
//util = require('util');

class Ball extends GameObject{
  
  constructor(x,y, radius){
    super(x, y, radius*2, radius*2);
    this.maxSpeed = 19;
    this.xVelocity = 5;
    this.yVelocity = 0;
    this.radius = radius;
  }
  
  increaseSpeed(){
    if(this.xVelocity < this.maxSpeed){
      this.xVelocity *= 1.1;
    }
    if(this.yVelocity < this.maxSpeed){
      this.yVelocity *= 1.1;
    }
  }
  

}

module.exports = Ball;