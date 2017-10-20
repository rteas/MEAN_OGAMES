import { Component, OnInit, OnDestroy,  DoCheck } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RoomService } from '../room.service';
import { UserService } from '../../users/user.service';
import { Room } from '../room';
import { User } from '../../users/user';
import 'rxjs/add/operator/switchMap';
import { GlobalService } from '../../globals.service';
import { ChatService } from '../../chat/chat.service';
import { ChatboxComponent } from '../../chat/chatbox/chatbox.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  providers: [ChatboxComponent]
})

export class RoomComponent implements OnInit, OnDestroy {

  room: Room;
  user: User;
  users: User[] = [];
  selectedGame: string;

  constructor(private roomService: RoomService,
              private userService: UserService,
              private chatService: ChatService,
              private globalService: GlobalService,
              private chatboxComponent: ChatboxComponent,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    
    this.selectedGame = "Tutorial";
    
    this.user = this.globalService.userInfo;

    if(!this.globalService.userInfo){
      this.router.navigate(['/']);
    }
    
    let id = this.route.snapshot.paramMap.get('id').toString();
    
    if(this.chatService.username && this.user){
      this.chatService.joinRoom(id);
    }

    this.roomService.getRoom(id)
      .then(room => {
        console.log(room);
        this.room = room;
        this.chatService.joinRoom(room._id);
        this.chatService.switchChatLocation(room._id);
        this.globalService.roomInfo = room;
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
      })
      .then(() => {
        console.log("users gathered and loaded?");
        this.chatboxComponent.resizeChatBox();
      });

  }
  
  selectGame(game: string){
    this.selectedGame = game;
    console.log('Selected game: '+ game);
  }
  
  leaveRoom(){
    this.roomService.removeUserFromRoom(this.room, this.user);
    this.globalService.roomInfo = null;
    this.router.navigate(['/lobby']);
  }
  
  ngOnDestroy(){
    // removing user...
    //console.log('removing user...');
    //this.roomService.removeUserFromRoom(this.room, this.user);
    // switch user location
    this.chatService.switchChatLocation("lobby");
  }
  

}
