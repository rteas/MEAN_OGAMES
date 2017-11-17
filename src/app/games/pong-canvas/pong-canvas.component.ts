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
  reconnect$: Subscription;
  
  reload$: Subscription;
  stateData$: Subscription;
  syncData$: Subscription;
  syncLobby$: Subscription;
  syncPlay$: Subscription;
  
  playData$: Subscription;
  playRemove$: Subscription;
  playEnd$: Subscription;
  
  restart$: Subscription;
  
  special$: Subscription;
  
  lobbyTimer: any;
  playTimer: any;
  
  sendTime: number = 17;
  username: string;
  funMode: boolean;
  
  constructor(private pongService: PongCanvasService,
              private globalService: GlobalService) { }

  ngOnInit() {
    this.pongGame = new PongGame('pong', 500,500);
    this.username = this.globalService.userInfo.username;
    this.pongGame.start();
    this.addLobbyListeners();
    this.addPlayListeners();
    this.addRestartListener();
    this.addSyncListener();
    
    // add a socket on reconnect
    this.addReconnectListener();
    /*
    this.pongService.socket.on('reconnect', (attempts)=>{
      console.log('====================reconnected==============================');
      this.pongService.emitGameData('resume-pong-game', 'resume');
      this.pongService.emitGameData('get-sync', 'state');
    })
    
    this.pongService.socket.on('disconnect', (data) => {
      console.log('====================disconnected==============================');
    });
    */
    
    this.funMode = false;
    
    this.input = new Input();
    
    // initialize data from backend
    
    // send a sync request
    this.pongService.emitGameData('get-sync', 'state');
    
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
  
  hackToggle(){
    this.pongService.emitGameData('hax', '1337');
  }
  
  isRoomMaster(): boolean{
    return (this.globalService.userInfo._id === this.globalService.roomInfo.owner);
  }
  
  lobbyState(): boolean{
    return (this.pongGame.getState()==="lobby");
  }
  
  // room master signal to start game
  startPlayState(){
    this.pongService.emitGameData('play', 'play');
  }
  
  stopPongGame(){
    this.pongService.stopPongGame();
  }
  
  // TODO: remove listeners according to the state of the game
  ngOnDestroy(){
    this.removeLobbyListeners();
    this.removeServerListeners();
    this.removeRestartListener();
    this.removeSyncListener();
    this.stopSendPlayerDataControls();
    this.removeReconnectListener();
  }
  
  addSyncListener(){
    this.syncData$ = this.pongService.listen('sync').subscribe((data) =>{
      console.log('state data: ');
      // get username
      // get side
      console.log(data);
      
      if(data.state === 'lobby'){
        this.pongGame.changeState('lobby');
        
        var playersData = data.gameData;
          if(playersData){
            playersData.forEach((player)=>{
              
              var side = player[0];
              var username = player[1].username;
              
              // set user to this if it isn't set already
              // if it isn't already set
              if(username = this.username){
                this.pongGame.setPlayer(side, username);
              }
              else{
                this.pongGame.setOpponent(side, username);
              }
              
          });
        }
        
      }
      if(data.state === 'play'){
        this.pongGame.changeState('play');
        // initialize player data
        var playersData = data.gameData;
          if(playersData){
            playersData.forEach((player)=>{
              
              var side = player[0];
              var username = player[1].username;
              
              if(username = this.username){
                this.pongGame.setPlayer(side, username);
              }
              else{
                this.pongGame.setOpponent(side, username);
              }
              
          });
          
          this.pongGame.removeUnselectedPlayers();
        }
        
      }
      if(data.state === 'end'){
        this.pongGame.changeState('end');
      }
    });
    
  }
  
  removeSyncListener(){
    if(this.syncData$){
      this.syncData$.unsubscribe();
    }
  }
  
  removeServerListeners(){
    this.pongService.removePongGameServerListeners();
  }
  
  //  listeners will:
  //    attach a data emitter to send data to server
  //    listener to get data from the server
  
  restart(){
    this.pongService.emitGameData('restart', 'restart');
  }
  
  reInitialize(){
    this.pongService.emitGameData('re-initialize', 'reinitialize');
  }
  
  removeReconnectListener(){
    if(this.restart$){
      this.restart$.unsubscribe();
    }
  }
  
  addLobbyListeners(){
    
    this.lobbySelection$ = this.pongService.listen('selection-results').subscribe((data) =>{

      if(data.success){
        // add player by setting the username
        let username = data.player.username;
        let side = data.player.side;
        // set player to selected by adding a username
        this.pongGame.players[side].name = username;
        if(username === this.username){
          // set user to this side
          this.pongGame.setPlayer(side, username);
        }
      }
    });
    
    this.lobbyReady$ = this.pongService.listen('lobby-data').subscribe((data) =>{
      console.log('ready data: ');
      // get username
      // get side
    });
    
    this.lobbyPlay$ = this.pongService.listen('play').subscribe((data) =>{
      console.log('play data: ');
      console.log('data');
      
      // remove unselected players
      // allow player input data to be sent to server
      // start the game
      this.pongGame.removeUnselectedPlayers();
      this.startSendPlayerData();
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
  
  startSendPlayerData(){
    // send data every 17ms?
    this.playTimer = setInterval(()=>{
      if(this.pongGame.player){
        this.sendPlayerData();
      }
      else{
        clearInterval(this.playTimer);
      }
    }, this.sendTime);
  }
  
  stopSendPlayerDataControls(){
    clearInterval(this.playTimer);
  }
  
  addReloadListener(){
    this.reload$ = this.pongService.listen('reloaded-userdata').subscribe((data) => {
      this.requestSync();
    });
  }
  
  addReconnectListener(){
    this.restart$ = this.pongService.listen('get-client-data').subscribe((data) => {
      this.pongService.emitGameData('load-client-data', this.username);
    });
  }
  
  addPlayListeners(){
    
    // get game data - { side, position }
    // update game accordingly
    this.playData$ = this.pongService.listen('play-data').subscribe((data) => {
      
      var players = data.players;
      var ball = data.ball;
      
      // update ball position
      console.log(data);
      
      if(ball){
        this.pongGame.ball.setPosition(ball.x, ball.y);
      }
      // update player positions
      if(players){
        if(this.funMode){
          players.forEach((player)=>{
          this.pongGame.setPlayerPosition(player.position.x, player.position.y, player.side );
        });
        }
        else{
          players.forEach((player)=>{
          
            if((player.side !== this.pongGame.player.side)){
              this.pongGame.setPlayerPosition(player.position.x, player.position.y, player.side );
            }
  
          });
        }
      }

    });
    
    this.special$ = this.pongService.listen('hax').subscribe((side) => {
      // toggle fun mode
      this.funMode = !this.funMode;
    });
    
    this.playRemove$ = this.pongService.listen('play-remove').subscribe((side) => {
      // stop sending data to server if this player is
      // the client's player
      this.pongGame.removePlayer(side);
      if(side === this.pongGame.player.side){
        this.stopSendPlayerDataControls();
      }
      console.log('play-removeed: '+ side);
    });
    
    // signal on end
    this.playEnd$ = this.pongService.listen('play-end').subscribe((data) => {
      
      console.log('play-end: ');
      this.stopSendPlayerDataControls();
      this.pongGame.setWinner();
      this.pongGame.changeState('end');
    });
    
  }
  
  removePlayListeners(){
    clearInterval(this.playTimer);
    
    if(this.playData$)
      this.playData$.unsubscribe();
    if(this.playRemove$)
      this.playRemove$.unsubscribe();
    if(this.playEnd$)
      this.playEnd$.unsubscribe();
  }
  
  addRestartListener(){
    this.restart$ = this.pongService.listen('restart').subscribe((data) => {
      this.pongGame.restart();
      this.requestSync();
    });
  }
  
  requestSync(){
    this.pongService.emitGameData('get-sync', 'state');
  }
  
  removeRestartListener(){
    if(this.restart$){
      this.restart$.unsubscribe();
    }
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
      //case 'end': this.processEndInput(); break;
      // case 'play': this.processPlayInput(); break;
    }
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
  
  
  moveSelection(side: string){
    this.pongGame.side = side;
    this.pongService.emitGameData('update-lobby-input', {side: side})
  }
  
}
