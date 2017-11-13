import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Canvas } from './canvas';
import { Paddle } from './objects/paddle';
import { Ball } from './objects/ball';
import { PongGame } from './pong-game';
import { Input } from './input';
import { PongCanvasService } from './pong-canvas.service';
import { GlobalService } from '../../globals.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-pong-canvas',
  templateUrl: './pong-canvas.component.html',
  styleUrls: ['./pong-canvas.component.css']
})
export class PongCanvasComponent implements OnInit, OnDestroy {
  
  pongGame: PongGame;
  key: string;
  input: Input;
  state: string;
  lobbySelection$: Subscription;
  lobbyReady$: Subscription;
  lobbyPlay$: Subscription;
  
  playData$: Subscription;
  playRemove$: Subscription;
  playEnd$: Subscription;
  
  lobbyTimer: any;
  playTimer: any;
  
  sendTime: number = 17;
  username: string;
  
  constructor(private pongService: PongCanvasService,
              private globalService: GlobalService) { }

  ngOnInit() {
    this.pongGame = new PongGame('pong', 500,500);
    this.username = this.globalService.userInfo.username;
    this.pongGame.start();
    this.addLobbyListeners();
    
    
    this.input = new Input();
    this.pongService.emitGameData('lobby-input', '');

    
    // initialize pong game event listener (lobby)
    
    // PONG STATES:
    // lobby state:
    // events emitted for player selection
    // 'emits' other player's current cursor/selection
    // also gets the player's ready status
    // room master may initialize the game at any time
    
    // play state:
    // events emitted from game data updates:
    // players, ball
    // eliminates player(s) when they fail to hit the ball
    
    // end state:
    // displays winner, allows player(s) to return to lobby
    
  }
  
  isRoomMaster(): boolean{
    return (this.globalService.userInfo._id === this.globalService.roomInfo.owner);
  }
  
  lobbyState(): boolean{
    return (this.pongGame.getState()==="lobby");
  }
  
  
  
  startPlay(){
    // signal change state in backend
    // and frontend
    this.pongService.emitGameData('play', 'play');
    // remove unselected players
    //this.pongGame.removeUnselectedPlayers();
    //this.pongGame.changeState('play');
  }
  
  stopPongGame(){
    this.pongService.stopPongGame();
  }
  
  stopGameLobby(){
    this.removeLobbyListeners();
    this.removeServerListeners();
    
  }
  
  // TODO: remove listeners according to the state of the game
  ngOnDestroy(){
    this.removeLobbyListeners();
    this.removeServerListeners();
  }
  
  removeServerListeners(){
    this.pongService.removePongGameServerListeners();
  }
  
  //  listeners will:
  //    attach a data emitter to send data to server
  //    listener to get data from the server
  
  addLobbyListeners(){
    
    // send data every 17ms?
    /*
    this.lobbyTimer = setInterval(()=>{
      this.pongService.emitGameData('lobby-input', this.pongGame.player);
    }, this.sendTime);
    */
    this.lobbySelection$ = this.pongService.listen('selection-results').subscribe((data) =>{
      console.log('selection-results');
      console.log(data);
      //console.log('selection data: ');
      //console.log(data);
      console.log(data.success);
      
      if(data.success){
        console.log('success!');
        // add player by setting the username
        let username = data.player.username;
        let side = data.player.side;
        // set player to selected by adding a username
        this.pongGame.players[side].name = username;
        if(username === this.username){
          // set user to this side
          this.pongGame.setPlayer(side, username);
          console.log('player selected!');
        }
        
      }
      
    });
    
    this.lobbyReady$ = this.pongService.listen('lobby-data').subscribe((data) =>{
      console.log('ready data: ');
      // get username
      // get side
      console.log(data);
    });
    
    this.lobbyPlay$ = this.pongService.listen('play').subscribe((data) =>{
      console.log('play data: ');
      console.log('data');
      
      // remove unselected players
      // start the game
      this.pongGame.removeUnselectedPlayers();
      this.addPlayListeners();
      this.pongGame.changeState('play');

    });
    
  }
  

  removeLobbyListeners(){
    clearInterval(this.lobbyTimer);
    
    if(this.lobbySelection$)
      this.lobbySelection$.unsubscribe();
    if(this.lobbyReady$)
      this.lobbyReady$.unsubscribe();
    if(this.lobbyPlay$)
      this.lobbyPlay$.unsubscribe();
  }
  
  addPlayListeners(){
    console.log('play listener added');
    
    // send data every 17ms?
    
    this.playTimer = setInterval(()=>{
      this.sendPlayerData();
    }, this.sendTime);
    
    
    // get game data - { side, position }
    // update game accordingly
    this.playData$ = this.pongService.listen('play-data').subscribe((data) => {
      
      var players = data.players;
      var ball = data.ball;
      
      // update ball
      this.pongGame.ball.setPosition(ball.x, ball.y);
      
      // update player movement
      players.forEach((player)=>{
        this.pongGame.setPlayerPosition(player.position.x, player.position.y, player.side );
        console.log('for-each player data:');
        console.log(player.side);
        console.log(player.position.x);
        console.log(player.position.y);
      })
      console.log('play-data: ');
      console.log(data);
    });
    
    this.playData$ = this.pongService.listen('play-remove').subscribe((side) => {
      // stop sending data to server if this player is
      // the client's player
      this.pongGame.removePlayer(side);
      if(side === this.pongGame.player.side){
        clearInterval(this.playTimer);
      }
      console.log('play-removeed: '+ side);
    });
    
    // signal on end
    this.playEnd$ = this.pongService.listen('play-end').subscribe((data) => {
      
      console.log('play-data: ');
      console.log(data);
      this.pongGame.changeState('end');
      this.removePlayListeners();
    });
    
    
  }
  
  removePlayListeners(){
    clearInterval(this.playTimer);
    
    if(this.playData$)
      this.playData$.unsubscribe();
    if(this.playEnd$)
      this.playEnd$.unsubscribe();
  }
  
  // listen for inputs
  @HostListener('document:keydown', ['$event'])
  handleKeyDownEvent(event: KeyboardEvent) {
    
    // pass key to the correct component
    this.key = event.key;
    console.log(this.key);
    this.input.addInput(this.key);
    
    var state = this.pongGame.getState();
    
    this.pongGame.input.addInput(this.key);
    
    switch(state){
      case 'lobby': this.processLobbyInput(); break;
      // case 'play': this.processPlayInput(); break;
    }
    

    
    /*
    switch(this.key){
      case 'a': 
        console.log('left');
        this.pongGame.movePlayer(-15,0);
        break;
      case 'd':
        console.log('right');
        this.pongGame.movePlayer(15,0);
      default:
        console.log('Non registered key pressed');
        break;
        
    }
    */
  }
  
  @HostListener('document:keyup', ['$event'])
  handleKeyUpEvent(event: KeyboardEvent) {
    
    // pass key to the correct component
    this.key = event.key;
    console.log(this.key);
    this.input.removeInput(this.key);
    this.pongGame.input.removeInput(this.key);

  }
  
  // checks if a player selected a side or not
  processLobbyInput(){
    var inputs = this.input.getInputs();
      for(var i = 0; i<inputs.length; i++){
        switch(inputs[i]){
          case 'ArrowLeft':
            if(!this.pongGame.player){
              this.pongGame.side = 'left';
            }
            break;
          case 'ArrowRight':
            if(!this.pongGame.player){
              this.pongGame.side = 'right';
            }
            break;
          case 'ArrowUp':
            if(!this.pongGame.player){
              this.pongGame.side = 'top';
            }
            break;
          case 'ArrowDown':
            if(!this.pongGame.player){
              this.pongGame.side = 'bottom';
            }
            
            break;
          case 'Enter':
            console.log(this.globalService.userInfo.username);
            if(!this.pongGame.player){
              var data = { side: this.pongGame.side, username: this.username }
              this.pongService.emitGameData('select-player', data);
            }
            /*
            console.log(this.pongGame.setPlayer(this.pongGame.side,  this.globalService.userInfo.username));
            console.log(this.pongGame.player);
            */
            // check if 
            /*
            this.setPlayer(this.side);
            if(this.debug){
              this.changeState('play');
            }
            */
            break;
          default:
            break;
        }
      }
  }
  
  sendPlayerData(){
    var player = this.pongGame.player;
    var data = { side: player.side, 
                  position: player.position, 
                  direction: player.direction 
    };
    console.log(data);
    this.pongService.emitGameData('play-input', data);
  }
  
  processPlayInput(){
    var inputs = this.input.getInputs();
      for(var i = 0; i<inputs.length; i++){
        if(this.pongGame.side === "top" || this.pongGame.side === "bottom"){
          switch(inputs[i]){

            case 'ArrowLeft':
              this.pongGame.movePlayer(-this.pongGame.player.speed,0, this.pongGame.player);
              this.sendPlayerData();
              break;
            case 'ArrowRight':
              this.pongGame.movePlayer(this.pongGame.player.speed,0, this.pongGame.player);
              this.sendPlayerData();
              break;
            default:
              break;
          }
          
        }
        if(this.pongGame.side === "left" || this.pongGame.side === "right"){
          switch(inputs[i]){
            case 'ArrowUp':
              this.pongGame.movePlayer(0, -this.pongGame.player.speed, this.pongGame.player);
              this.sendPlayerData();
            break;
            case 'ArrowDown':
              this.pongGame.movePlayer(0, this.pongGame.player.speed, this.pongGame.player);
              this.sendPlayerData();
            break;
          }
          
        }
        
      }
  }
  
  
  
  moveSelection(side: string){
    this.pongGame.side = side;
    this.pongService.emitGameData('update-lobby-input', {side: side})
  }
  
}
