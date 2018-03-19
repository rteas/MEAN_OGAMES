import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  selector: 'app-game-selector',
  templateUrl: './game-selector.component.html',
  styleUrls: ['./game-selector.component.css']
})
export class GameSelectorComponent implements OnInit {
  selectedGame: string;
  games: string[];
  
  public modalRef: BsModalRef;
  
  constructor(private modalService: BsModalService) { }
  
  ngOnInit() {
    // list games
    this.games = ["pong", "phaser-tut"];
    
    // default selected game to the first game
    this.selectedGame = this.games[0];
  }
  
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  
  
}
