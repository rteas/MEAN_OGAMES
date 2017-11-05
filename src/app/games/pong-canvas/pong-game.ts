import { Canvas } from './canvas';
import { Ball } from './objects/ball';
import { Paddle } from './objects/paddle';
import { States } from './states';
import { Input } from './input';
import { Player } from './objects/player';
/*
export interface IHash{
  [details: string] : string;
}

let myhash: IHash = {};
myhash["somestring"] = "value";
*/

export class PongGame {
  canvas: Canvas;
  paddle: Paddle;
  ball: Ball;
  states: States;
  player: Player;
  //playerTop: Player;
  
  gameTimer: any;
  input: Input;
  players: any;
  
  playerSpeed: number = 10;
  debug: boolean = true;
  
  constructor(canvas: string, width: number, height: number){
    this.players = {};
    
    this.canvas = new Canvas(canvas, width, height);
    //this.playerTop = new Paddle(this.canvas.width/2, 20, 100, 20);
    //this.player = new Paddle(250, 250,100,20);
    
    /*
    this.player = new Paddle(this.canvas.width-100, this.canvas.height-20,100,20);
    */
    
    // experimental side player
    /*
    this.playerSide = new Paddle(20, this.canvas.height/2 ,20,100);
    this.playerSide.addBoundary(0+this.playerSide.width/2, this.canvas.width-this.playerSide.width/2, 0+this.playerSide.height/2, this.canvas.height-this.player.height/2);
    this.playerSide.addCollider(this.playerSide.position.x, this.playerSide.position.y, this.playerSide.width, this.playerSide.height);
    this.playerSide.speed = 15;
    */
    
    this.addPlayer(0,0, "bottom");
    this.addPlayer(0,0, "left");
    
    
    this.setPlayer("bottom");
    
    console.log(this.player);
    this.ball = new Ball(this.canvas.width/2, this.canvas.height/2, 10);
    this.input = new Input();

  // Initialize states
    
  }
  
  setPlayer(side: string): boolean{
    var nextPlayer = this.players[side]
    if(nextPlayer){
      this.player = this.players[side];
      return true;
    }
    return false;
  }
  
  movePlayer(x: number, y: number, player: Paddle){
    player.move(x, y);
    if(player.collidesWith(this.players['left'])){
      console.log('collision detected at: ( '+ x + ',' + y + ')');
      // TODO: prevent player from moving past object
    }
  }
  
  moveBall(x: number, y: number, ball: Ball){
    
  }
  
  // Process by state
  processTitle(){
    
  }
  
  // States: ( Lobby, GameStart, GameEnd }
  
  // Lobby:
  //  Handles player paddle selection
  //  sync the game with players
  
  // GameStart:
  //  Handles gameplay of pong, ends when
  //  one player remains
  
  // GameEnd:
  //  Statis state with game details (winner, score, etc)
  //  Allows player to restart game
  
  drawLobby(){
    this.canvas.clear();
    
  }
  
  drawGame(){
    this.canvas.clear();
    // draw players

    this.drawPlayer('bottom');
    this.drawPlayer('left');
    
    //this.canvas.drawColorRect(this.playerSide.position.x, this.playerSide.position.y, this.playerSide.width, this.playerSide.height, 'green');

    this.canvas.drawCircle(this.ball.position.x, this.ball.position.y, this.ball.radius);
  }
  
  drawPlayer(side: string){
    this.canvas.drawColorRect(this.players[side].position.x, this.players[side].position.y, this.players[side].width, this.players[side].height, this.players[side].color);
  }
  
  startGame(){
    this.gameTimer = setInterval(()=>{
      // process game logic, inputs
      this.processStartGameInput();
      // draw
      this.drawGame();
    },
    17);
  }
  
  stopGame(){
    clearInterval(this.gameTimer);
  }
  
  // add players according to their locations
  addPlayer(x: number, y: number, side: string){
    switch(side){
      case 'bottom':
        this.players[side] = new Player(this.canvas.width-100, this.canvas.height-20,100,20, side, 'red');
        this.players[side].addBoundary(0+this.players[side].width/2, this.canvas.width-this.players[side].width/2, 0+this.players[side].height/2, this.canvas.height-this.players[side].height/2);
        this.players[side].addCollider(this.players[side].position.x, this.players[side].position.y, this.players[side].width, this.players[side].height);
        this.players[side].speed = this.playerSpeed;;
        
        break;
      case 'top':
        break;
      case 'left':
        this.players[side] = new Player(20, this.canvas.height/2 ,20,100, side, 'green');
        this.players[side].addBoundary(0+this.players[side].width/2, this.canvas.width-this.players[side].width/2, 0+this.players[side].height/2, this.canvas.height-this.players[side].height/2);
        this.players[side].addCollider(this.players[side].position.x, this.players[side].position.y, this.players[side].width, this.players[side].height);
        this.players[side].speed = this.playerSpeed;
      default:
        console.log('not a valid side to add player');
        break;
    }
    
  }
  
  processLobbyInput(){
    var inputs = this.input.getInputs();
      for(var i = 0; i<inputs.length; i++){
        switch(inputs[i]){

        }
      }
  }
  
  // TODO: fix multi input parsing
  // ie: 'A + a + <-' will move 3x
  processStartGameInput(){
    var inputs = this.input.getInputs();
      for(var i = 0; i<inputs.length; i++){
        switch(inputs[i]){
          case 'a':
            this.movePlayer(-this.player.speed,0, this.player);
            break;
          case 'A':
            this.movePlayer(-this.player.speed,0, this.player);
            break;
          case 'ArrowLeft':
            this.movePlayer(-this.player.speed,0, this.player);
            break;
          case 'd':
            this.movePlayer(this.player.speed,0, this.player);
            break;
          case 'D':
            this.movePlayer(this.player.speed,0, this.player);
            break;
          case 'ArrowRight':
            
            this.movePlayer(this.player.speed,0, this.player);
            break;
          case 'ArrowUp':
            this.movePlayer(0, -this.player.speed, this.player);
            break;
          case 'ArrowDown':
            this.movePlayer(0, this.player.speed, this.player);
            break;
          
          case '1':
            if(this.debug){
              this.setPlayer('bottom');
            }
            break;
          case '2':
            if(this.debug){
             this.setPlayer('left'); 
            }
            break;
          default:
            console.log('unexpected key');
            break;
        }
      }
  }
  
  startBattle(){
    
  }
  
}
