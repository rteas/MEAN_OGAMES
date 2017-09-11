import { Component, OnInit } from '@angular/core';
import { User } from '../users/user';
import { GlobalService } from '../globals.service';

import { UserListComponent } from '../users/user-list/user-list.component';
import { RoomListComponent } from '../rooms/room-list/room-list.component';
import { ChatboxComponent } from '../chat/chatbox/chatbox.component';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  user: User;
  constructor(private globalService: GlobalService) { }

  ngOnInit() {
    this.user = this.globalService.userInfo;
  }

}
