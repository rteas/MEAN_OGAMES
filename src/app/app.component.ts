import { Component } from '@angular/core';
import { User } from './users/user';
import { GlobalService } from './globals.service';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// TODO: IMPLEMENT APP SHUTDOWN 
export class AppComponent {
  
  constructor(public globalService: GlobalService){}
  
  title = 'app';
  toggleTitle() {
        alert('toggled');
        $('#title').text('jQUERRY');
    }
}
