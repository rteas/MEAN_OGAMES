import { Canvas } from './canvas';
import { Ball } from './objects/ball';
import { Paddle } from './objects/paddle';

export class PongGame {
  canvas: Canvas;
  paddle: Paddle;
  ball: Ball;
  
  constructor(canvas: string, width: number, height: number){
    this.canvas = new Canvas(canvas, width, height);
  }
  
}
