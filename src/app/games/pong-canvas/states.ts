// simple state
export class States {
  states: string[];
  selectedState: string;
  
  constructor(){
    this.states = [];
  }
  
  addState(state: string){
    this.states.push(state);
  }
  
  startState(state: string){
    this.selectedState = this.states[this.states.indexOf(state)];
  }
  
  changeState(state: string){
    this.selectedState = this.states[this.states.indexOf(state)];
  }
  
  getState(): string{
    return this.selectedState;
  }
  
}
