import { Component, OnInit } from '@angular/core';
import { Canvas } from './canvas';
import { Paddle } from './objects/paddle';
import { Ball } from './objects/ball';

@Component({
  selector: 'app-pong-canvas',
  templateUrl: './pong-canvas.component.html',
  styleUrls: ['./pong-canvas.component.css']
})
export class PongCanvasComponent implements OnInit {
  
  canvas: Canvas;
  
  constructor() { }

  ngOnInit() {
    this.canvas = new Canvas('pong', 500,500);
    var player = new Paddle(0, 0, 100, 20);
    var playerx = new Paddle(this.canvas.width-100, this.canvas.height-20,100,20);
    var ball = new Ball(this.canvas.width/2, this.canvas.height/2, 10);
    this.canvas.drawColorRect(player.position.x, player.position.y,player.width,player.height, 'blue');
    this.canvas.drawColorRect(playerx.position.x, playerx.position.y, playerx.width, playerx.height, 'red');

    this.canvas.drawCircle(ball.position.x, ball.position.y, ball.radius);
    
  }
  
  
}
