import { Component, OnInit, OnDestroy,  OnChanges } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RoomService } from '../room.service';
import { UserService } from '../../users/user.service';
import { Room } from '../room';
import { User } from '../../users/user';
import 'rxjs/add/operator/switchMap';
import { GlobalService } from '../../globals.service';
import { ChatService } from '../../chat/chat.service';
import { ChatboxComponent } from '../../chat/chatbox/chatbox.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  providers: [ChatboxComponent]
})

export class RoomComponent implements OnInit, OnDestroy,  OnChanges {

  room: Room;
  user: User;
  users: User[] = [];

  constructor(private roomService: RoomService,
              private userService: UserService,
              private chatService: ChatService,
              private globalService: GlobalService,
              private chatboxComponent: ChatboxComponent,
              private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.user = this.globalService.userInfo;
    
    let id = this.route.snapshot.paramMap.get('id').toString();
    
    if(this.chatService.username && this.user){
      this.chatService.joinRoom(id);
    }
    

    this.roomService.getRoom(id)
      .then(room => {
        console.log(room);
        this.room = room;
      })
      // get users from the room
      .then(() => {
        for(var i = 0; i < this.room.users.length; i++){
          this.userService.getUser(this.room.users[i])
                        .then(user => {
                          var tempUser: User = user;
                          this.users.push(tempUser)
                        });
        }
      });

  }
  
  
  ngOnChanges() {
    // reset chatbox view
    console.log('inited');
    this.chatboxComponent.resizeChatBox();
  }
  
  ngOnDestroy(){
    // removing user...
    console.log('removing user...');
    this.roomService.removeUserFromRoom(this.room, this.user);
  }
  

}
