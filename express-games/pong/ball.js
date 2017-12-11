var GameObject = require('./gameObject.js')
//util = require('util');

class Ball extends GameObject{
  
  constructor(x,y, radius){
    super(x, y, radius*2, radius*2);
    this.maxSpeed = 5;
    this.xVelocity = 2.5 + .5*Math.random();
    this.yVelocity = 2.5 + .5*Math.random();
    this.radius = radius;
  }
  
  // increases velocity by % parameters 1.<percent>
  increaseSpeed(x, y){
    if(Math.abs(this.xVelocity) < this.maxSpeed){
      this.xVelocity *= x;
      if(Math.abs(this.xVelocity) > this.maxSpeed){
        this.xVelocity = this.maxSpeed;
      }
    }
    if(Math.abs(this.yVelocity) < this.maxSpeed){
      this.yVelocity *= y;
      if(Math.abs(this.yVelocity) > this.maxSpeed){
        this.yVelocity = this.maxSpeed;
      }
    }
  }
  
  randomIncrease(){
    return (1+.05+.05*Math.random());
  }
  
}

module.exports = Ball;