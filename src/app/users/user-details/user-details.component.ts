import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../globals.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(private globalService: GlobalService) { }

  ngOnInit() {
  }

}
