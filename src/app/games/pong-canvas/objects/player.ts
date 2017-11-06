import { Paddle } from './paddle';

export class Player extends Paddle{
  side: string;
  score: number;
  color: string;
  name: string;

  constructor(x: number, y: number, width: number, height: number, side: string, color: string, name: string){
    super(x, y, width, height);
    this.side = side;
    this.color = color;
    this.name = name;
  }
  
  
}
