import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../globals.service';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(private globalService: GlobalService,
              private userService: UserService) { }
  userFriends : User[] = [];
  
  ngOnInit() {
    var friends = this.globalService.userInfo.friends;
    for(var i = 0; i < friends.length; i++){
      this.userService.getUser(friends[i])
                        .then(user => {
                          var tempUser: User = user;
                          this.userFriends.push(tempUser);
                        });
    }
  }

}
