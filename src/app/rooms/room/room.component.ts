import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RoomService } from '../room.service';
import { UserService } from '../../users/user.service';
import { Room } from '../room';
import { User } from '../../users/user';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  room: Room;
  users: User[] = [];
  
  constructor(private roomService: RoomService,
              private userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id').toString();
    console.log(id);
    this.roomService.getRoom(id)
      .then(room => this.room = room)
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

}
