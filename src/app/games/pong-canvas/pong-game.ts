import { Canvas } from './canvas';
import { Ball } from './objects/ball';
import { Paddle } from './objects/paddle';
import { States } from './states';
import { Input } from './input';

export class PongGame {
  canvas: Canvas;
  paddle: Paddle;
  ball: Ball;
  states: States;
  players: number;
  player: Paddle;
  playerTop: Paddle;
  
  gameTimer: any;
  input: Input;
  
  constructor(canvas: string, width: number, height: number){
    this.canvas = new Canvas(canvas, width, height);
    this.playerTop = new Paddle(0, 0, 100, 20);
    // this.player = new Paddle(this.canvas.width-100, this.canvas.height-20,100,20);
    this.player = new Paddle(250, 250,100,20);

    this.player.speed = 15;
    console.log(this.player);
    this.ball = new Ball(this.canvas.width/2, this.canvas.height/2, 10);
    this.input = new Input();

  // Initialize states
    
  }
  movePlayer(x: number, y: number, player: Paddle){
    player.move(x, y);
  }
  
  // Process by state
  processTitle(){
    
  }
  
  draw(){
    this.canvas.clear();
    this.canvas.drawColorRect(this.playerTop.position.x, this.playerTop.position.y, this.playerTop.width, this.playerTop.height, 'blue');
    this.canvas.drawColorRect(this.player.position.x, this.player.position.y, this.player.width, this.player.height, 'red');

    this.canvas.drawCircle(this.ball.position.x, this.ball.position.y, this.ball.radius);
  }
  
  startGame(){
    this.gameTimer = setInterval(()=>{
      // process game logic, inputs
      this.processStartGameInput();
      // draw
      this.draw();
    },
    17);
  }
  
  stopGame(){
    clearInterval(this.gameTimer);
  }
  
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
          default:
            console.log('unexpected key');
            break;
        }
      }
  }
  startBattle(){
    
  }
  
}
