// this is a standard rectange collider
export class Collider {
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
  
  constructor(xmin: number, xmax: number, ymin: number, ymax: number){
    this.setColliders(xmin, xmax, ymin, ymax);
  }
  
  setColliders(xmin: number, xmax: number, ymin: number, ymax: number){
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
    if(this.xmin > other.xmin && this.xmin < other.xmax){
      
      if(this.ymin > other.ymin && this.ymin < other.ymax ){
        return true;
      }
      if(this.ymax > other.ymax && this.ymax < other.ymin ){
        return true;
      }
    }
    
    if(this.xmax >= other.xmin && this.xmax <= other.xmax){
      
      if(this.ymin >= other.ymin && this.ymin <= other.ymax ){
        return true;
      }
      if(this.ymax >= other.ymax && this.ymax <= other.ymin ){
        return true;
      }
    }
    
    // other check with this
    if(other.xmin > this.xmin && other.xmin < this.xmax){
      
      if(other.ymin > this.ymin && other.ymin < this.ymax ){
        return true;
      }
      if(other.ymax > this.ymax && other.ymax < this.ymin ){
        return true;
      }
    }
    
    if(other.xmax >= this.xmin && other.xmax <= this.xmax){
      
      if(other.ymin >= this.ymin && other.ymin <= this.ymax ){
        return true;
      }
      if(other.ymax >= this.ymax && other.ymax <= this.ymin ){
        return true;
      }
    }
    // no matches
    return false;
  }
  
}
