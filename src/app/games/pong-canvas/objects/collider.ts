// this is a standard rectange collider
import { LineSegment } from './line-segment';
export class Collider {
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
  
  constructor(xmin: number, xmax: number, ymin: number, ymax: number){
    this.setCollider(xmin, xmax, ymin, ymax);
  }
  
  setCollider(xmin: number, xmax: number, ymin: number, ymax: number){
    this.xmin = xmin;
    this.xmax = xmax;
    this.ymin = ymin;
    this.ymax = ymax;
  }
  
  move(x: number, y: number){
    this.xmin += x;
    this.xmax += x;
    this.ymin += y;
    this.ymax += y;
  }
  
  collidesWith(other: Collider): boolean{
    // perform arithmetic to check between colliders
    // check min and max points
    
    // perform this with check with this collider and 
    // other collider
    
    // this check with other
    if(this.isInside(this, other) || this.isInside(other, this)){
      return true;
    } 
    
    // no matches
    return false;
  }
  
  
  hasIntersection(){
    
  }
  
  
  // checks using 4 points of each collider object for collision
  isInside(current: Collider, other: Collider):boolean{
    if(current.xmin > other.xmin && current.xmin < other.xmax){
      
      if(current.ymin > other.ymin && current.ymin < other.ymax ){
        return true;
      }
      if(current.ymax > other.ymax && current.ymax < other.ymin ){
        return true;
      }
    }
    
    if(current.xmax > other.xmin && current.xmax < other.xmax){
      
      if(current.ymin > other.ymin && current.ymin < other.ymax ){
        return true;
      }
      if(current.ymax > other.ymax && current.ymax < other.ymin ){
        return true;
      }
    }
  }
  
}
