import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { User } from './users/user';
import { GlobalService } from './globals.service';
import { RoomService } from './rooms/room.service';
import * as io from 'socket.io-client/dist/socket.io.slim.js';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// TODO: IMPLEMENT APP SHUTDOWN 
export class AppComponent implements OnInit, OnDestroy{
  
  constructor(public globalService: GlobalService,
              private roomService: RoomService
              ){}
  
  title = 'app';
  toggleTitle() {
        alert('toggled');
        $('#title').text('jQUERRY');
    }
    
  ngOnInit(){
    console.log('initalized application');
  }
  
  // remove client from room (if exists)
  ngOnDestroy(){
    
    
  }
  
  @HostListener('window:beforeunload', [ '$event' ])
  beforeUnloadHander(event) {
    
    console.log('clooosing');
    /*
    var socket = this.globalService.socketInfo;
    if (socket) socket.emit('message', 'application closed');
    
    var user = this.globalService.userInfo
    var room = this.globalService.roomInfo;
    if(user && room){
      this.roomService.removeUserFromRoom(room, user);
    }
    */
    
  }
}
