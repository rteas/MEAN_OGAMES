import { Vector } from './vector';

export class LineSegment {

  pointA: Vector;
  pointB: Vector;
  
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
  
  constructor(x1: number, y1: number, x2: number, y2: number){
    this.pointA = new Vector(x1, y1);
    this.pointB = new Vector(x2, y2);
    
    // initialize min/max values
    if(x1 > x2){
      this.xmax = x1;
      this.xmin = x2;
    }
    else if(x1 < x2){
      this.xmax = x2;
      this.xmin = x1;
    }
    else{
      this.xmin = this.xmax = x1;
    }
    
    if(y1 > y2){
      this.ymax = y1;
      this.ymin = y2;
    }
    else if(y1 < y2){
      this.ymax = y2;
      this.ymin = y1;
    }
    else{
      this.ymin = this.ymax = y1;
    }
  }
  
  hasIntersection(other: LineSegment): boolean{
    if(this.pointA.x > other.xmin && this.pointA.x < other.xmax){
      
    }
    if(this.pointA.y > other.ymin && this.pointA.y < other.ymax){
      
    }
    return false;
  }
}
