import { Component, OnInit } from '@angular/core';
import { RoomService } from '../room.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-room-search',
  templateUrl: './room-search.component.html',
  styleUrls: ['./room-search.component.css']
})
export class RoomSearchComponent implements OnInit {
  results: Object;
  searchTerm$ = new Subject<string>();
  
  constructor(private roomService: RoomService) { }

  ngOnInit() {
  }

}
