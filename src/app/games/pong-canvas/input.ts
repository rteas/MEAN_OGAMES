export class Input {
  keys: string[];
  
  constructor(){
    this.keys = [];
  }
  
  addInput(key: string){
    if(this.keys.indexOf(key) == -1){
      this.keys.push(key);
    }
  }
  
  removeInput(key: string){
    this.keys.splice(this.keys.indexOf(key), 1);
  }
  
  getInputs(){
    return this.keys;
  }
  
}
