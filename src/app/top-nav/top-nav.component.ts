import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../globals.service';
import { User } from '../users/user';

declare var $: any;

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  
  //user: User;
  mobileDisplay: boolean = false; 
  resizeInProgress: boolean = false;
  mobileWidth: number = 991;
  
  constructor(public globalService: GlobalService) { }

  ngOnInit() {
    
  }
  
   toggleNav() {
      var topNav = document.getElementById("responsiveNav");
      if (topNav.className === "topnav fixed-top") {
          topNav.className += " responsive";
      } 
      else {
          topNav.className = "topnav fixed-top";
      }
  }
  
  closeNav(){
    var topNav = document.getElementById("responsiveNav");
    if(topNav.className !== "topnav fixed-top"){
      topNav.className = "topnav fixed-top";
    }
  }
  
  /*
  displayCheck(){
   //alert($(window).height());
    if(this.resizeInProgress) return;
    this.resizeInProgress=true;
    setTimeout(()=>{
      this.setIfMobileDisplay();
      this.resizeInProgress = false;
      console.log('timeout exected');
    }, 250);
    
  }
  
  setIfMobileDisplay(){
    let curWidth = this.getWindowWidth();
      if(curWidth <= this.mobileWidth){
        this.mobileDisplay = true;
      }
      else{
        this.mobileDisplay = false;
      }
    console.log("Window Width: "+curWidth);
  }
  
  getWindowWidth(): number{
    var windowWidth = $(window).width();
    return windowWidth;
  }
  */
}
