class PongGame{
  
  constructor(){
    this.sockets = [];
    // set game boundary
    this.start();
    
  }
  
  start(){
    this.i = 0;
    this.gameTick = setInterval(()=>{
      this.i++;
      console.log(this.i);
      if(this.i === 5){
        console.log('done!');
        this.stop();
      } 
    }, 1000);
  }
  
  // adds player to a side
  // string: left, right, top, bottom
  addPlayer(side){
    
  }
  
  // join player to socket
  stop(){
    clearInterval(this.gameTick);
  }
  

}

module.exports = PongGame;