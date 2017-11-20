var HashMap = require('hashmap');
var Boundary = require('./boundary');
var Player = require('./player');
var Ball = require('./ball');


class PongGame{

  constructor(io, room){
    this.inPlay = false;
    this.playersMap = new HashMap();
    
    this.io = io;
    this.room = room;
    
    this.states =  Object.freeze({
      LOBBY: 0,
      PLAY: 1,
      END: 2
    });
    
    // set game dimensions
    this.gameWidth = 500;
    this.gameHeight = 500;
    
    // maybe rename to playerLongSide & playerShortSide
    this.longSide = 100;
    this.shortSide = 20;
    this.ballRadius = 5;
    
    // initialize ball to the middle
    this.ball = new Ball(this.gameWidth/2, this.gameHeight/2, this.ballRadius );
    console.log(this.ball);
    this.state = this.states.LOBBY;
    this.restart = false;
    
  }
  
  startPlay(){
    this.state = this.states.PLAY;
  }
  
  switchState(state){
    switch(state){
      case this.states.LOBBY: this.state = state; break;
      case this.states.PLAY: this.state = state; break;
      case this.states.END: this.state = state; break;
      default: this.state = this.states.LOBBY; console.log('error: invalid state, defaulting to lobby'); break;
    }
  }
  
  start(){
    this.inPlay = true;
    this.i = 0;
    this.gameTick = setInterval(()=>{
      switch(this.state){
        case this.states.LOBBY: this.lobby(); break;
        case this.states.PLAY: this.play(); break;
        case this.states.END: this.end(); break;
        default: this.lobby(); console.log('error in state'); break;
      }
      
    }, 17);
  }
  
  restartGame(){
    this.restart = true;
  }
  
  // Lobby state:
  // Set all the (available) players to their selected side
  // Transition to start state when the room master clicks play
  lobby(){
    //console.log('LOBBY state');
    
    // add a player to the bottom
    /*
    this.addPlayer('rteas', 'bottom');
    this.addPlayer('xyz', 'top');
    this.addPlayer('leet', 'left');
    this.addPlayer('test', 'right');
    */
    
    // initialize players and values on chaning state to play
    this.initializeBall();
    
    //console.log(this.getLobbyData());
  }
  
  // Play state:
  // Update game data (ball, player location)
  // processes game logic: did the ball collide with a paddle?
  // if so, change the direction of the ball (and increase the speed) by 5%
  // every (number of player) hits
  play(){
    console.log('PLAY state');
    this.moveBall(this.ball);
    //console.log(this.ball);
    this.handlePotentialBallCollisions(this.ball);
    
    var playData = this.getPlayData();
    //console.log(playData);
    
    this.io.to(this.room).emit('play-data', this.getPlayData());
    
  }
  
  // End state:
  // States the winner,
  // can restart the game at lobby state
  end(){
    //console.log('END state');
    
    if(this.restart){
      this.restart = false;
      // clear player mapping
      this.playersMap.clear();
      this.switchState(this.states.LOBBY);
    } 
    
  }
  
  singlePlayer(){
    if(this.getPlayerCount === 1){
      return true;
    }
    return false;
  }
  
  getPlayerCount(){
    return this.playersMap.size;
  }
  
  updatePlayerLocation(x, y, side, direction){
    var player = this.playersMap.get(side);
    if(player){
      player.setPosition(x,y);
      player.setDirection(direction);
    }
  }
  
  getPlayersData(){
    
  }
  
  getLobbyPlayerSelected(){
    
  }
  
  getLobbyData(){

      var players = [];
      this.playersMap.forEach((player, side) => {

        var position = player.position;
        var username = player.username;
        
        var playerData = {side: side, position: position, username: username };
        players.push(playerData);
      });
      var data = { players: players };

    return data;
  }
  
  getLobbyCursorData(){
    
  }
  
  // give coordinates of players on each side
  // ball location
  getPlayData(){
      // minimize data to send
      var players = [];
      this.playersMap.forEach((player, side) => {

        var position = player.position;
        var playerData = { side: side, position: position };
        players.push(playerData);
      });

      var data = { players: players, ball: this.ball.position };
      return data;
  }
  
  getBallData(){
    return this.ball;
  }
  
  getPlayersData(){
    return this.playersMap.entries();
  }
  
  getEndData(){
    return { error: 'incorrect state' };
  }
  
  
  
  // creates instance of a ball & set to random direction
  initializeBall(){
    this.ball = new Ball(this.gameWidth/2, this.gameHeight/2, this.ballRadius);
    /*
    if(!this.ball){
      this.ball = new Ball(this.gameWidth/2, this.gameHeight/2, this.ballRadius);
    }
    else{
      this.ball.setPosition(this.gameWidth/2, this.gameHeight/2);
    }
    */
  }
  
  moveBall(ball){
    ball.setPosition(ball.position.x + ball.xVelocity, ball.position.y + ball.yVelocity);
  }
  
  // ball checks for specific points
  // a potential collision between the ball & player can occur at:
  // top:
  // (x, radius <= y <= shortSide+raidus)
  // bottom:
  // (x, gameHeight - ( shortSide + radius ) <= y <= gameHeight - radius )
  // left:
  // (radius <= x <= shortSide+radius, y)
  // right:
  // (gameWidth - (shortSide+radius) <= x <= gameWidth - radius)
  // 
  // bounce the ball according to player's direction
  handlePotentialBallCollisions(ball){
    /*
    console.log(
      '['
      +
      (this.gameHeight - this.shortSide + ball.radius)
      +' - '+
      (this.gameHeight-ball.radius)
      +
      ']'
      );
    */

    if(ball.radius <= ball.position.y  && ball.position.y <= this.shortSide + ball.radius){
      this.handlePotentialBallPlayerCollision('top', ball);
    }
    if((this.gameHeight - this.shortSide + ball.radius) <= ball.position.y && ball.position.y <= (this.gameHeight-ball.radius)){
      this.handlePotentialBallPlayerCollision('bottom', ball);
    }
    if(this.ballRadius <= ball.position.x && ball.position.x <= this.shortSide+this.ball.radius){
      this.handlePotentialBallPlayerCollision('left', ball);
    }
    if(this.gameWidth - (this.shortSide + ball.radius) <= ball.position.x && ball.position.x <= this.gameWidth-ball.radius){
      this.handlePotentialBallPlayerCollision('right', ball);
    }
    this.handlePotentialBallWallCollision(ball);
  }
  
  // only checks for collisions at specific key points
  // helper method for handleballplayercollision
  // moves ball according to player's direction
  handlePotentialBallPlayerCollision(side, ball){
    var player = this.playersMap.get(side);
    
    if(player){
      if(side === 'top' || side === 'bottom'){
        //console.log("#########"+side+("#########"));
        if((player.position.x-player.width/2) <= ball.position.x && ball.position.x <= (player.position.x+player.width/2)){
          //console.log('==========ball hit!=====');
          ball.yVelocity *= -1;
          ball.increaseSpeed();
          if(player.direction === 'right'){
            if(ball.xVelocity < 0){
              ball.xVelocity *= -1;
            }
          }
          if(player.direction === 'left'){
            if(ball.xVelocity > 0 ){
              ball.xVelocity *= -1;
            }
          }
          return true;
        }
      }
      if(side === 'left' || side === 'right'){
        //console.log("#########"+side+("#########"));
        if(player.position.y-player.height/2 <= ball.position.y && ball.position.y <= player.position.y+player.height/2){
          //console.log('==========ball hit!=====');
          ball.xVelocity *= -1;
          ball.increaseSpeed();
          if(player.direction == 'up'){
            if(ball.yVelocity > 0){
              ball.yVelocity *= -1;
            }
          }
          if(player.direction == 'down'){
            if(ball.yVelocity < 0){
              ball.yVelocity *= -1;
            }
          }
          return true;
        }
      }
    }
    return false;
  }
  
  // Checks if ball is past the possibility of being hit
  // if a specific side is hit, and the player is available
  // remove the player
  // top:
  // y < radius
  // bottom:
  // y > gameHeight-radius
  // left:
  // x < radius
  // right:
  // x > gameWidth-radius
  handlePotentialBallWallCollision(ball){
    if(ball.position.y < ball.radius){
      ball.yVelocity *= -1;
      if(this.playersMap.get('top')){
        this.removePlayer('top');
      }
    }
    if(ball.position.y > this.gameHeight - ball.radius){
      ball.yVelocity *= -1;
      if(this.playersMap.get('bottom')){
        this.removePlayer('bottom');
      }
    }
    if(ball.position.x < ball.radius){
      ball.xVelocity *= -1;
      if(this.playersMap.get('left')){
        this.removePlayer('left');
      }
    }
    if(ball.position.x > this.gameWidth - ball.radius){
      ball.xVelocity *= -1;
      if(this.playersMap.get('right')){
        this.removePlayer('right');
      }
    }
  }
  stop(){
    clearInterval(this.gameTick);
  }
  
  // adds player to a side (only allowed in the lobby state)
  // return false if a player already exists at that side
  // string: left, right, top, bottom
  addPlayer(username, side){
    switch(side){
      case 'left':
        if(this.playersMap.get(side)) return false;
        var player = new Player(this.shortSide/2, this.gameHeight/2, this.shortSide, this.longSide, username);
        this.playersMap.set(side, player);
        return true;
      case 'right':
        if(this.playersMap.get(side)) return false;
        var player = new Player(this.gameWidth-(this.shortSide/2), this.gameHeight/2, this.shortSide, this.longSide, username);
        this.playersMap.set(side, player);
        return true;
      case 'top':
        if(this.playersMap.get(side)) return false;
        var player = new Player(this.gameWidth/2, this.shortSide/2, this.longSide, this.shortSide, username);
        this.playersMap.set(side, player);
        return true;
      case 'bottom':
        if(this.playersMap.get(side)) return false;
        var player = new Player(this.gameWidth/2, this.gameHeight-this.shortSide/2, this.longSide, this.shortSide, username);
        this.playersMap.set(side, player);
        return true;
      case 'default':
        console.log('error in pongGame/addPlayer');
        return false;
    }
  }
  
  setPlayerPosition(x, y, side){
    var player = this.playersMap.get(side);
    if(player){
      player.setPosition(x,y);
    }
  }
  
  removePlayer(side){
    if(this.playersMap.get(side)){
      this.playersMap.set(side, null);
      this.playersMap.delete(side);
    }
    this.io.to(this.room).emit('play-remove', side);
    if(this.playersMap.size <= 1){
      this.io.to(this.room).emit('play-end');
      this.switchState(this.states.END);
    }
  }

}

PongGame.states = Object.freeze({
      LOBBY: 0,
      PLAY: 1,
      END: 2
    });

module.exports = PongGame;