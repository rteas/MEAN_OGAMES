import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../globals.service';
import { User } from '../users/user';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  
  //user: User;
  
  constructor(public globalService: GlobalService) { }

  ngOnInit() {
    //this.user = this.globalService.userInfo;
  }

}
