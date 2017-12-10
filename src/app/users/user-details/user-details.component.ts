import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../globals.service';
import { UserService } from '../user.service';
import { RoomService } from '../../rooms/room.service';
import { User } from '../user';
import { Room } from '../../rooms/room';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(public globalService: GlobalService,
              public userService: UserService,
              private roomService: RoomService,
              private activatedRoute: ActivatedRoute) { }
  user: User;
  userFriends : User[] = [];
  room: Room;
  
  ngOnInit() {
    // TODO: get user by id
    let id = this.activatedRoute.snapshot.paramMap.get('id').toString();
    
    this.userService.getUser(id)
                    .then(user => {
                      if (!user.friends){
                        user.friends = [];
                      }
                      if (!user.location) {
                        user.location = 'unknown';
                      }
                      // if user is in a room, get the room data
                      else{
                        this.roomService.getRoom(user.location)
                                        .then( room => {
                                          this.room = room;
                                        });
                      }
                      this.user = user;
                    });
    
    // populate friends
    var friends = this.globalService.userInfo.friends;
    for(var i = 0; i < friends.length; i++){
      this.userService.getUser(friends[i])
                        .then(user => {
                          var tempUser: User = user;
                          this.userFriends.push(tempUser);
                        });
    }
    
    
    
  }
  
  populateRoom(){
    
  }
  

}
