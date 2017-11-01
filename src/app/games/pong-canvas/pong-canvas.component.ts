import { Component, OnInit, HostListener } from '@angular/core';
import { Canvas } from './canvas';
import { Paddle } from './objects/paddle';
import { Ball } from './objects/ball';
import { PongGame } from './pong-game';
import { Input } from './input';

@Component({
  selector: 'app-pong-canvas',
  templateUrl: './pong-canvas.component.html',
  styleUrls: ['./pong-canvas.component.css']
})
export class PongCanvasComponent implements OnInit {
  
  pongGame: PongGame;
  canvas: Canvas;
  player: Paddle;
  playerTop: Paddle;
  drawTimer: any;
  ball: Ball;
  key: string;
  
  constructor() { }

  ngOnInit() {
    this.pongGame = new PongGame('pong', 500,500);
    //this.pongGame.draw();
    this.pongGame.startGame();
    
  }
  
  // listen for inputs
  @HostListener('document:keydown', ['$event'])
  handleKeyDownEvent(event: KeyboardEvent) {
    
    // pass key to the correct component
    this.key = event.key;
    console.log(this.key);
    this.pongGame.input.addInput(this.key);
    /*
    switch(this.key){
      case 'a': 
        console.log('left');
        this.pongGame.movePlayer(-15,0);
        break;
      case 'd':
        console.log('right');
        this.pongGame.movePlayer(15,0);
      default:
        console.log('Non registered key pressed');
        break;
        
    }
    */
  }
  
  @HostListener('document:keyup', ['$event'])
  handleKeyUpEvent(event: KeyboardEvent) {
    
    // pass key to the correct component
    this.key = event.key;
    console.log(this.key);
    this.pongGame.input.removeInput(this.key);

  }
  
  draw(){
    this.canvas.clear();
    this.canvas.drawColorRect(this.playerTop.position.x, this.playerTop.position.y, this.playerTop.width, this.playerTop.height, 'blue');
    this.canvas.drawColorRect(this.player.position.x, this.player.position.y, this.player.width, this.player.height, 'red');

    this.canvas.drawCircle(this.ball.position.x, this.ball.position.y, this.ball.radius);
  }
  
  
}
