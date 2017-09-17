import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RoutingModule } from './routing/routing.module';

import { UserService } from './users/user.service';
import { GlobalService } from './globals.service';
import { RoomService } from './rooms/room.service';
import { ChatService } from './chat/chat.service';

import { AppComponent } from './app.component';
import { ContactDetailsComponent } from './contacts/contact-details/contact-details.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { RoomListComponent } from './rooms/room-list/room-list.component';
import { LoginComponent } from './users/login/login.component';
import { LobbyComponent } from './lobby/lobby.component';
import { RoomDetailsComponent } from './rooms/room-details/room-details.component';
import { RoomComponent } from './rooms/room/room.component';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ChatboxComponent } from './chat/chatbox/chatbox.component';


@NgModule({
  declarations: [
    AppComponent,
    ContactDetailsComponent,
    ContactListComponent,
    UserListComponent,
    UserDetailsComponent,
    RoomListComponent,
    LoginComponent,
    LobbyComponent,
    RoomDetailsComponent,
    RoomComponent,
    ChatboxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule
  ],
  providers: [
    UserService, 
    GlobalService, 
    RoomService, 
    ChatService,
    { provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
