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

  
    create() {
        var text = "TODO: PONG";
        var style = { font: "65px Arial", fill: "#ffffff", align: "center" };
        this.game.add.text(0, 0, text, style);
    }

  
  ngOnInit() {
    this.game = new Game(500, 500, AUTO, 'content', { create: this.create });
  }

}
