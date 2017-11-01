export class Boundary {
    xmin: number;
    xmax: number;
    ymin: number;
    ymax: number;
    
    constructor(xmin: number, xmax: number, ymin: number, ymax: number){
        this.setBoundary(xmin, xmax, ymin, ymax);
    }
    
    setBoundary(xmin: number, xmax: number, ymin: number, ymax: number){
        this.xmin = xmin;
        this.xmax = xmax;
        this.ymin = ymin;
        this.ymax = ymax;
    }
    
}
