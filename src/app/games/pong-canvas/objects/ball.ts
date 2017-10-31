import { GameObject } from './game-object';

export class Ball extends GameObject {
  
  radius: number;
  speed: number;

  constructor(x: number, y: number, radius: number){
    super(x, y, radius, radius);
    this.radius = radius;
  }

}
