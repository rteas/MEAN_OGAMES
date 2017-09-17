import { Component, OnInit } from '@angular/core';
import { Room } from '../room';
import { User } from '../../users/user';
import { RoomService } from '../room.service';
import { GlobalService } from '../../globals.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {
  user: User;
  rooms: Room[];
  
  roomListHeight: number;
  
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
    //this.setRoomHeight();
  }
  
  setRoomHeight(){
    var body = document.body,
    html = document.documentElement;

    var windowHeight = $(window).height();
    
    var titleHeight = $('#roomlist-title').offset().top + $('#roomlist-title').outerHeight(true);
    var roomControlHeight = $('#roomlist-controls').outerHeight();
    
    this.roomListHeight = windowHeight - (titleHeight + 2*roomControlHeight);
    
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
