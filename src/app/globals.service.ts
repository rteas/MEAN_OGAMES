// globals.service.ts
import { User } from './users/user';
import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {
  userInfo: User;
}