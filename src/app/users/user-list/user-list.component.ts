import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { RoomService } from '../../rooms/room.service';
import { Room } from '../../rooms/room';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [ UserService ]
})
export class UserListComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService,
              private roomService: RoomService
              ) { }

  ngOnInit() {
    this.userService
        .getUsers()
        .then((users: User[]) => {
          this.users = users.map((user) => {
            if(!user.friends){
              user.friends = [];
            }
            if(!user.location){
              user.location = 'unknown';
              user.locationName = 'unknown';
            }
            else{
              this.roomService.getRoom(user.location)
                  .then( room => {
                    user.locationName = room.name;
                    });
                  }
            return user;
          });
        });
  }
  
  sortUsersByScore(users: User[], start: number, end: number){

    // Check conditions, return if it is <=1, it is already sorted by definition
    if(end<=start){
      return;
    }
    // find halfway point
    var mid = Math.floor((end-start)/2);
    
    // Divide array into two and sort them
    // 1st half: start - midpoint
    this.sortUsersByScore(users, start, mid);
    // 2nd half: midpoint+1 - end
    this.sortUsersByScore(users, mid+1, end);
    
    // sort the left and right array
    // create a new array and push values depending on left and right
    var tempUsers: User[] = [];
    
    // compare values between left and right array
    // left: start->mid
    // right: mid+1-> end
    // keep adding while there are still comparable values
    var left = start;
    var right = mid+1;

    while(left <= mid && right <= end){
      
      // merge array by adding lower values first
      if(users[left].topScore <= users[right].topScore){
        tempUsers.push(users[left]);
        left++;
      }
      else{
        tempUsers.push(users[right]);
        right++;
      }
    }
    
    // if all of the elements on the left is exhausted, just append the rest from the right - vice versa.
    if(left > mid){
      while(right <= end){
        tempUsers.push(users[right]);
        right++;
      }
    }
    if(right > end){
      while(left <= mid){
        tempUsers.push(users[left]);
        left++;
      }
    }
    
    // set users to tempUsers
    for(var i = start; i<= end; i++){
      this.users[i] = tempUsers[i];
    }
    
    return;

  }

}
