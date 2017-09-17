import { Component } from '@angular/core';
import { User } from './users/user';
import { GlobalService } from './globals.service';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(public globalService: GlobalService){}
  
  title = 'app';
  toggleTitle() {
        alert('toggled');
        $('#title').text('jQUERRY');
    }
}
