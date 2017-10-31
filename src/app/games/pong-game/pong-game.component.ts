import { Component, OnInit, OnDestroy } from '@angular/core';

// import { Game, AUTO } from 'phaser-ce';
import { PongGame } from './game/PongGame';

@Component({
  selector: 'app-pong-game',
  templateUrl: './pong-game.component.html',
  styleUrls: ['./pong-game.component.css']
})
export class PongGameComponent implements OnInit, OnDestroy {

  title = "Angular Phaser"
  pongGame: PongGame;
  
  constructor() { 
        
  }
  
  ngOnInit(){
    this.pongGame = new PongGame();
  }
  
  ngOnDestroy(){
    this.pongGame.destroy();
  }
  /*
  ngOnInit() {
    this.game = new Game(500, 500, AUTO, 'content', 
                      { preload: this.preload, 
                        create: this.create,
                        update: this.update
                      });
  }
  
  preload(){
    
  }
  
  create() {
    var text = "TODO: PONG";
    var style = { font: "65px Arial", fill: "#ffffff", align: "center" };
    this.game.add.text(0, 0, text, style);
  }
  
  update(){
    
  }
  
  ngOnDestroy(){
    this.game.destroy();
    console.log('pong game destroyed');
  }
  */
}
