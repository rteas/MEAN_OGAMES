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
  
  increaseSpeed(){
    if(Math.abs(this.xVelocity) < this.maxSpeed){
      this.xVelocity = this.randomIncrease(this.xVelocity);
      if(Math.abs(this.xVelocity) > this.maxSpeed){
        this.xVelocity = this.maxSpeed;
      }
    }
    if(Math.abs(this.yVelocity) < this.maxSpeed){
      this.yVelocity = this.randomIncrease(this.yVelocity);
      if(Math.abs(this.yVelocity) > this.maxSpeed){
        this.yVelocity = this.maxSpeed;
      }
    }
  }
  
  randomIncrease(speed){
    return speed*(1+.05+.05*Math.random());
  }
  
}

module.exports = Ball;