import { Vector } from './vector';

export class GameObject {
  position: Vector;
  width: number;
  height: number;
  
  constructor(x: number, y: number, width: number, height: number){
    this.position = new Vector(x,y);
    this.width = width;
    this.height = height;
  }
  
  move(x: number, y: number){
    this.position.x = x;
    this.position.y = y;
  }
  
}
