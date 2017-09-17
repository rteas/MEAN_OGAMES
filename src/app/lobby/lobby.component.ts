import { Component, OnInit } from '@angular/core';
import { User } from '../users/user';
import { GlobalService } from '../globals.service';

import { UserListComponent } from '../users/user-list/user-list.component';
import { RoomListComponent } from '../rooms/room-list/room-list.component';
import { ChatboxComponent } from '../chat/chatbox/chatbox.component';
import { UserService } from '../users/user.service';

import { ChatService } from '../chat/chat.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  user: User;
  users: User[];
  constructor(private globalService: GlobalService,
              private chatService: ChatService,
              private userService: UserService) { }

  ngOnInit() {
    this.user = this.globalService.userInfo;
    
    // Create connection to socket.io chat
    if(!this.chatService.username && this.user){
      this.chatService.join(this.user.username);
    }
    
    this.userService
        .getUsers()
        .then((users: User[]) => {
          this.users = users.map((user) => {
            if(!user.friends){
              user.friends = [];
            }
            if(!user.location){
              user.location = 'unknown';
            }
            return user;
          });
        });
  }

}
