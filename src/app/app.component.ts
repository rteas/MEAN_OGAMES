import { Component } from '@angular/core';

declare var jquery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  toggleTitle() {
        alert('toggled');
        jQuery('#title').text('jQUERRY');
    }
}
