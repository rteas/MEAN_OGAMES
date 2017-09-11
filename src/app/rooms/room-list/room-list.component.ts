import { Component, OnInit } from '@angular/core';
import { Room } from '../room';
import { User } from '../../users/user';
import { RoomService } from '../room.service';
import { GlobalService } from '../../globals.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {
  user: User;
  rooms: Room[];
  
  constructor(private roomService: RoomService,
              private globalService: GlobalService,
              private router: Router) { }

  ngOnInit() {
    this.user = this.globalService.userInfo;
    this.roomService
        .getRooms()
        .then((rooms: Room[]) => {
          this.rooms = rooms.map((room) => {
            return room;
          });
        });
  }
  
  enterRoom(room: Room, user: User){
    console.log('ENTERING ROOM:'+ room._id);
    /*
    this.roomService
    .addUserToRoom(room, user)
    .then((room => {
      console.log("room: " + room);
    }))
    .then(() => this.router.navigate(['/room/'+room._id]));
    */
    let link = ['/room', room._id]
    this.router.navigate(link);
  }

}
