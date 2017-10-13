import { Component, OnInit } from '@angular/core';

import { Game, AUTO } from 'phaser-ce';

@Component({
  selector: 'app-pong-game',
  templateUrl: './pong-game.component.html',
  styleUrls: ['./pong-game.component.css']
})
export class PongGameComponent implements OnInit {

  title = "Angular Phaser"
  game: Game;
  
  constructor() { 
        
  }
  
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
  


}
