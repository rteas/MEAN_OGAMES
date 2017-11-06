import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Canvas } from './canvas';
import { Paddle } from './objects/paddle';
import { Ball } from './objects/ball';
import { PongGame } from './pong-game';
import { Input } from './input';
import { PongCanvasService } from './pong-canvas.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-pong-canvas',
  templateUrl: './pong-canvas.component.html',
  styleUrls: ['./pong-canvas.component.css']
})
export class PongCanvasComponent implements OnInit, OnDestroy {
  
  pongGame: PongGame;
  key: string;
  
  lobbySelection$: Subscription;
  lobbyReady$: Subscription;
  lobbyPlay$: Subscription;
  
  constructor(private pongService: PongCanvasService) { }

  ngOnInit() {
    this.pongGame = new PongGame('pong', 500,500);
    this.pongGame.start();
    
    // initialize pong game event listeners
    
    // lobby state:
    // events emitted for player selection
    // 'emits' other player's current cursor/selection
    // also gets the player's ready status
    // room master may initialize the game at any time
    
    // play state:
    // events emitted from game data updates:
    //  players, ball
    // eliminates player(s) when they fail to hit the ball
    
    // end state:
    // displays winner, allows player(s) to return to lobby
    
  }
  
  // TODO: remove listeners according to the state of the game
  ngOnDestroy(){
    this.removeLobbyListeners();
  }
  
  addLobbyListeners(){
    this.lobbySelection$ = this.pongService.listen('selection').subscribe((data) =>{
      console.log('selection data: ');
      // get username
      // get side
      console.log(data);
    })
    
    this.lobbyReady$ = this.pongService.listen('ready').subscribe((data) =>{
      console.log('ready data: ');
      // get username
      // get side
      console.log(data);
    })
    
    this.lobbyPlay$ = this.pongService.listen('play').subscribe((data) =>{
      console.log('play data: ');
      // start the game
      console.log(data);
    })
    
  }
  
  removeLobbyListeners(){
    if(this.lobbySelection$)
      this.lobbySelection$.unsubscribe();
    if(this.lobbyReady$)
      this.lobbyReady$.unsubscribe();
    if(this.lobbyPlay$)
      this.lobbyPlay$.unsubscribe();
  }
  
  addPlayListeners(){
    
  }
  
  removePlayListeners(){
    
  }
  
  addEndListeners(){
    
  }
  
  removeEndListeners(){
    
  }
  
  // listen for inputs
  @HostListener('document:keydown', ['$event'])
  handleKeyDownEvent(event: KeyboardEvent) {
    
    // pass key to the correct component
    this.key = event.key;
    console.log(this.key);
    this.pongGame.input.addInput(this.key);
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
    this.pongGame.input.removeInput(this.key);

  }
  
}
