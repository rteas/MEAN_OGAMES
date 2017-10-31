import { Canvas } from './canvas';
import { Ball } from './objects/ball';
import { Paddle } from './objects/paddle';
import { States } from './states';

export class PongGame {
  canvas: Canvas;
  paddle: Paddle;
  ball: Ball;
  states: States;
  players: number;
  player: Paddle;
  playerTop: Paddle;
  
  drawTimer: any;
  
  constructor(canvas: string, width: number, height: number){
    this.canvas = new Canvas(canvas, width, height);
    this.playerTop = new Paddle(0, 0, 100, 20);
    this.player = new Paddle(this.canvas.width-100, this.canvas.height-20,100,20);
    console.log(this.player);
    this.ball = new Ball(this.canvas.width/2, this.canvas.height/2, 10);

  // Initialize states
    
  }
  movePlayer(x: number, y:number){
    this.player.move(this.player.position.x+x, this.player.position.y+y);
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
    this.drawTimer = setInterval(()=>{
      this.draw();
    },
    17);
  }
  
  startBattle(){
    
  }
  
}
