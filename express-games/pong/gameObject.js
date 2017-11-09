var Position = require('./position.js');

class GameObject{
  
  constructor(x, y, width, height){
    this.width = width;
    this.height = height;
    this.position = new Position(x,y);
  }
  
  setPosition(x,y){
    this.position.setPosition(x,y);
  }
  
  getPosition(){
    return this.position;
  }
  
  printPosition(){
    console.log('( '+this.position.x + ', ' + this.position.y + ' )');
  }
  
}

module.exports = GameObject;