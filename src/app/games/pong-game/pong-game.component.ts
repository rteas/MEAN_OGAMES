import { Component, OnInit, OnDestroy } from '@angular/core';

import { Game, AUTO } from 'phaser-ce';

@Component({
  selector: 'app-pong-game',
  templateUrl: './pong-game.component.html',
  styleUrls: ['./pong-game.component.css']
})
export class PongGameComponent implements OnInit, OnDestroy {

  title = "Angular Phaser"
  game: Game;
  
  constructor() { 
        
  }
  
  ngOnInit(){
    var canvas: any = document.querySelector("#glCanvas");
    
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    // Initialize the GL context
    var gl = canvas.getContext("webgl");
  
    // Only continue if WebGL is available and working
    if (!gl) {
      alert("Unable to initialize WebGL. Your browser or machine may not support it.");
      return;
    }
  
    // Set clear color to white, fully opaque
    gl.clearColor(255, 255, 255, 1.0);
    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);
  }
  
  keyHandler(event) {
    // grab key
    console.log(event.key);

  } 
  
  ngOnDestroy(){
    
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
