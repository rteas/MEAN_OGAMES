import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../globals.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  
  constructor(private globalService: GlobalService,
              private router: Router ) { }

  ngOnInit() {
    
    // logout
    
    // clear data
    if(this.globalService.userInfo){
      this.globalService.userInfo = null;
    }
    if(this.globalService.roomInfo){
      this.globalService.roomInfo = null;
    }
    this.router.navigate(['/login']);
    
  }

}
