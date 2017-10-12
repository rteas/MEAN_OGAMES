import { Component, OnInit } from '@angular/core';
import { Room } from '../room';
import { User } from '../../users/user';
import { RoomService } from '../room.service';
import { UserService } from '../../users/user.service';
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
  selectedRoom: Room;
  
  roomListHeight: number;
  resizeInProgress: boolean = false;
  
  constructor(private roomService: RoomService,
              private globalService: GlobalService,
              private userService: UserService,
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
    $(document).ready(this.setRoomHeight());
  }
  
  resizeRoomList(){
    if(this.resizeInProgress) return;
    this.resizeInProgress=true;
    setTimeout(()=>{
      this.setRoomHeight();
      this.resizeInProgress = false;
    }, 250);
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
    // console.log('ENTERING ROOM:'+ room._id);
    // Check if room needs password
    // If a password is needed, prompt password form
    
    this.roomService
    .addUserToRoom(room, user)
    .then(() => {
      
      if(room){
        this.router.navigate(['/rooms/'+room._id]);
      }
      else{
        console.log('room full');
      }
      
    });
    
  }
  
  deleteRoom(room: Room): void{
    this.roomService.deleteRoom(room)
        .then(()=> {
          this.roomService
          .getRooms()
          .then((rooms: Room[]) => {
            this.rooms = rooms.map((room) => {
              return room;
            });
          });
          this.setRoomHeight();
        });
  }

}
