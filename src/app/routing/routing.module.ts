import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../users/login/login.component';
import { LobbyComponent } from '../lobby/lobby.component';
import { RoomComponent } from '../rooms/room/room.component';
import { UserDetailsComponent } from '../users/user-details/user-details.component';

const routes: Routes = [
    
    { path: 'login', component: LoginComponent },
    { path: 'lobby', component: LobbyComponent },
    { path: 'users/:id', component: UserDetailsComponent },
    { path: 'rooms/:id', component: RoomComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    // Last path because it checks for matches iteratively
    { path: '**', component: LoginComponent }
  ];

/*
route additional option
{ enableTracing: true }
*/

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class RoutingModule {
  
}
