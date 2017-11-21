import { Canvas } from './canvas';
import { Ball } from './objects/ball';
import { Paddle } from './objects/paddle';
import { States } from './states';
import { Input } from './input';
import { Player } from './objects/player';
/*
export interface IHash{
  [details: string] : string;
}

let myhash: IHash = {};
myhash["somestring"] = "value";
*/

export class PongGame {
  canvas: Canvas;

  ball: Ball;
  states: States;
  player: Player;
  
  gameTimer: any;
  input: Input;
  players: any;
  
  playerSpeed: number = 10;
  debug: boolean = false;
  side: string;
  selectedPlayer: boolean;
  winner: string;
  
  constructor(canvas: string, width: number, height: number){
    this.players = {};
    
    this.canvas = new Canvas(canvas, width, height);
    this.player = null;
    // initialize players
    
    this.addPlayer("bottom", "red", "");
    this.addPlayer("left", "green", "");
    this.addPlayer("top", "blue", "");
    this.addPlayer("right", "purple", "");
    
    this.selectedPlayer = false;

    this.ball = new Ball(this.canvas.width/2, this.canvas.height/2, 10);
    this.input = new Input();
    this.side = "left";

    // States: ( Title, Lobby, Play, End }
    // Title:
    //  initial state - display title and initializes player data
    
    // Lobby:
    //  Handles player paddle selection
    //  sync the game with players
    
    // Play:
    //  Handles gameplay of pong, ends when
    //  one player remains
    
    // End:
    //  Statis state with game details (winner, score, etc)
    //  Allows player to restart game
    this.states = new States();
    this.states.addState('title');
    this.states.addState('lobby');
    this.states.addState('play');
    this.states.addState('end');
    
  }
  
  startState(state: string){
    this.states.startState(state);
  }
  
  changeState(state: string){

    switch(state){
      case 'title':
        this.states.changeState('title');
      case 'lobby':
        setTimeout(()=> {
          this.states.changeState('lobby');
        }, 250);
      case 'play':
        this.states.changeState('play');
        break;
      case 'end':
        setTimeout(()=>{
          this.states.changeState('end');
        }, 250);
        break;
      default:
        this.states.changeState('title');
        break;
    }
    
  }
  
  getState(): string{
    return this.states.getState();
  }
  
  start(){
    // initialize starting state state to title
    this.states.startState('lobby');
    
    this.gameTimer = setInterval(()=>{
      let state = this.states.getState();
      switch(state){
        /*
        case 'title':
          this.title();
          break;
        */
        case 'lobby':
          this.lobby();
          break;
        case 'play':
          this.play();
          break;
        case 'end':
          this.end();
          break;
        default:
          break;
      }
      
    }, 17);
  }
  
  setOpponent(side: string, username: string){
    this.players[side].name = username;
  }
  
  setPlayer(side: string, username: string): boolean{
    this.player = this.players[side]
    if(this.player){
      this.player.name = username;
      this.side = side;
      return true;
    }
    return false;
  }
  
  movePlayer(x: number, y: number, player: Player){
  
    player.move(x, y);
    
    if(x < 0) player.direction = 'left';
    if(x > 0) player.direction = 'right';
    if(y < 0) player.direction = 'up';
    if(y > 0) player.direction = 'down';
    
    /*
    if(player.collidesWith(this.players['left'])){
      console.log('collision detected at: ( '+ player.position.x + ',' + player.position.y + ' )');
      // TODO: prevent player from moving past object
    }
    */
  }
  
  setPlayerPosition(x: number, y: number, side: string){
    this.players[side].setPosition(x,y);
  }
  
  resetBallPosition(ball){
    ball.setPosition(this.canvas.width/2, this.canvas.height/2);
  }
  
  
  setBallPosition(x: number, y: number, ball: Ball){
    ball.setPosition(x,y);
  }
  
  moveBall(x: number, y: number, ball: Ball){
    ball.move(x,y);
  }
  
  removePlayer(side: string): boolean{
    if(this.players[side]){
      this.players[side] = null;
      return true;
    }
    return false;
  }
  
  // removes players without a name
  removeUnselectedPlayers(){
    for(let player in this.players){
      if(this.players[player]){
        if(this.players[player].name === ""){
          this.players[player] = null;
        }
      }
    }
  }
  
  /*
  title(){
      // process game logic, inputs
      this.processTitleInput();
      // draw
      this.drawTitle();
  }
  */
  
  lobby(){
      // process game logic, inputs
      // this.processLobbyInput();
      // draw
      this.drawLobby();
  }
  
  play(){
      // process game logic, inputs
      this.processPlayInput();
      // draw
      this.drawPlay();

  }
  
  end(){
    this.processEndInput();
    this.drawEnd();
  }
  
  drawTitle(){
    this.canvas.clear();
    this.canvas.context.font = this.canvas.height/10 +"px Arial";
    this.canvas.context.textAlign= "center";
    this.canvas.context.fillText("Pong", this.canvas.width/2 , this.canvas.height/2)
    let offsetHeight = this.canvas.height/2+ this.canvas.height/10 + 5;
    this.canvas.context.font = this.canvas.height/15 +"px Arial";
    this.canvas.context.fillText("Press 'Enter' to Start", this.canvas.width/2 , offsetHeight);
    
  }
  
  drawLobby(){
    this.canvas.clear();
    this.canvas.context.font = this.canvas.height/10 +"px Arial";
    this.canvas.context.textAlign= "center";
    this.canvas.context.fillText("Select a side", this.canvas.width/2 , this.canvas.height/2)
    let offsetHeight = this.canvas.height/2+ this.canvas.height/15 + 5;
    this.canvas.context.font = this.canvas.height/20 +"px Arial";
    this.canvas.context.fillText("(use arrow keys and press enter)", this.canvas.width/2 , offsetHeight);
    
    // draw selections
    this.highlightSelections();
    
    // draw players
    for(let player in this.players){
      if(this.players[player]){
        this.drawPlayer(this.players[player]);
      }
    }
    
    // draw player selection
    this.drawPlayerSelect(this.players[this.side], 'black');
  }
  
  drawPlay(){
    this.canvas.clear();
    
    // draw players
    for(let player in this.players){
      if(this.players[player]){
        this.drawPlayer(this.players[player]);
      }
    }
    
    // draw ball
    this.canvas.drawCircle(this.ball.position.x, this.ball.position.y, this.ball.radius);
  }
  
  drawEnd(){
    this.canvas.clear();
    this.canvas.context.font = this.canvas.height/10 +"px Arial";
    this.canvas.context.textAlign= "center";
    this.canvas.context.fillText("Winner: "+ this.winner+'!', this.canvas.width/2 , this.canvas.height/2);
  }
  
  drawPlayer(player: Player){
    this.canvas.drawColorRect(player.position.x, player.position.y, player.width, player.height, player.color);
  }
  
  cascadePlayer(player: Player, color: string){
      this.canvas.drawColorRect(player.position.x, player.position.y, player.width, player.height, color);

  }
  
  borderPlayer(player: Player, color: string){
      this.canvas.drawColorRect(player.position.x, player.position.y, player.width+10, player.height+10, color);

  }
  
  setWinner(){
    for(let player in this.players){
      if(this.players[player]){
        this.winner = this.players[player].name;
      }
    }
  }

  
  // add players according to their locations
  addPlayer(side: string, color: string, name: string){
    switch(side){
      case 'bottom':
        this.players[side] = new Player(this.canvas.width/2, this.canvas.height-10,100,20, side, color, name);
        this.players[side].addBoundary(0+this.players[side].width/2, this.canvas.width-this.players[side].width/2, 0+this.players[side].height/2, this.canvas.height-this.players[side].height/2);
        this.players[side].addCollider(this.players[side].position.x, this.players[side].position.y, this.players[side].width, this.players[side].height);
        this.players[side].speed = this.playerSpeed;
        break;
      case 'top':
        this.players[side] = new Player(this.canvas.width/2, 10,100,20, side, color, name);
        this.players[side].addBoundary(0+this.players[side].width/2, this.canvas.width-this.players[side].width/2, 0+this.players[side].height/2, this.canvas.height-this.players[side].height/2);
        this.players[side].addCollider(this.players[side].position.x, this.players[side].position.y, this.players[side].width, this.players[side].height);
        this.players[side].speed = this.playerSpeed;
        break;
      case 'left':
        this.players[side] = new Player(10, this.canvas.height/2 ,20,100, side, color, name);
        this.players[side].addBoundary(0+this.players[side].width/2, this.canvas.width-this.players[side].width/2, 0+this.players[side].height/2, this.canvas.height-this.players[side].height/2);
        this.players[side].addCollider(this.players[side].position.x, this.players[side].position.y, this.players[side].width, this.players[side].height);
        this.players[side].speed = this.playerSpeed;
        break;
      case 'right':
        this.players[side] = new Player(this.canvas.width-10, this.canvas.height/2 ,20,100, side, color, name);
        this.players[side].addBoundary(0+this.players[side].width/2, this.canvas.width-this.players[side].width/2, 0+this.players[side].height/2, this.canvas.height-this.players[side].height/2);
        this.players[side].addCollider(this.players[side].position.x, this.players[side].position.y, this.players[side].width, this.players[side].height);
        this.players[side].speed = this.playerSpeed;
        break;
      default:
        console.log('not a valid side to add player');
        break;
    }
    
  }
  
  highlightPlayer(player: Player, color: string){
    
  }
  
  // highlight players who have their usernames populated (selected)
  highlightSelections(){
    for(let player in this.players){
      if(this.players[player]){
        if(this.players[player].name !== ""){
          this.borderPlayer(this.players[player], "black");
        }
      }
    }
  }
  
  restart(){
    
    if(this.player){
      this.player = null;
      this.removePlayer(this.side);
    }
    
    this.players = {};
    this.addPlayer("bottom", "red", "");
    this.addPlayer("left", "green", "");
    this.addPlayer("top", "blue", "");
    this.addPlayer("right", "purple", "");
    this.changeState('lobby');
    
    this.side = "left";
    
    this.resetBallPosition(this.ball);
  }
  
  drawPlayerSelect(player: Player, color: string){
    this.canvas.drawColorRect(player.position.x, player.position.y, 10,10, color);
  }
  
  processTitleInput(){
    var inputs = this.input.getInputs();
      for(var i = 0; i<inputs.length; i++){
        switch(inputs[i]){
          case 'Enter':
            this.changeState('lobby');
            break;
          default:
            break;

        }
      }
  }
  
  
  /*
  processLobbyInput(){
    var inputs = this.input.getInputs();
      for(var i = 0; i<inputs.length; i++){
        switch(inputs[i]){
          case 'ArrowLeft':
            this.side = 'left';
            break;
          case 'ArrowRight':
            this.side = 'right';
            break;
          case 'ArrowUp':
            this.side = 'top';
            break;
          case 'ArrowDown':
            this.side = 'bottom';
            break;
          case 'Enter':
            this.setPlayer(this.side);
            if(this.debug){
              this.changeState('play');
            }
            break;
          default:
            break;
        }
      }
  }
  */
  // TODO: fix multi input parsing
  // ie: 'A + a + <-' will move 3x
  processPlayInput(){
    var inputs = this.input.getInputs();
      for(var i = 0; i<inputs.length; i++){
        if(this.side === "top" || this.side === "bottom"){
          switch(inputs[i]){

            case 'ArrowLeft':
              this.movePlayer(-this.player.speed,0, this.player);
              break;
            case 'ArrowRight':
              this.movePlayer(this.player.speed,0, this.player);
              break;
            default:
              break;
          }
          
        }
        if(this.side === "left" || this.side === "right"){
          switch(inputs[i]){
            case 'ArrowUp':
              this.movePlayer(0, -this.player.speed, this.player);
            break;
            case 'ArrowDown':
              this.movePlayer(0, this.player.speed, this.player);
            break;
          }
          
        }
        if(this.debug){
          switch(inputs[i]){
            case '1':
              this.setPlayer('bottom', 'fakeName');
              break;
            case '2':
              this.setPlayer('left', 'fakeName'); 
              break;
            case '3':
              this.setPlayer('top', 'fakeName'); 
              break;
            case '4':
              this.setPlayer('right', 'fakeName');
              break;
            case 'e':
              this.changeState('end');
              break;
            default:
              console.log('unexpected key');
              break;
          }
        }
        
      }
  }
  
  processEndInput(){
    var inputs = this.input.getInputs();
      for(var i = 0; i<inputs.length; i++){
        switch(inputs[i]){
          case 'r':
            this.changeState('lobby');
            break;
          default:
            break;

        }
      }
  }
  
}
