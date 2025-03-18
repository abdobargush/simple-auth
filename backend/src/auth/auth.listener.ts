import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserLoggedInEvent } from './events/user-loggedin.event';
import { UserRegisteredEvent } from './events/user-registered.event';
import { UserService } from 'src/user/user.service';
import { now } from 'mongoose';

@Injectable()
export class AuthListener {
  constructor(private userService: UserService) {}

  @OnEvent('user.loggedin')
  async handleUserLoggedIn(event: UserLoggedInEvent) {
    await this.userService.logUserEvent(event.user, {
      context: 'User logged in',
      datetime: now(),
    });
  }

  @OnEvent('user.registered')
  async handleUserRegistered(event: UserRegisteredEvent) {
    await this.userService.logUserEvent(event.user, {
      context: 'User Registred',
      datetime: now(),
    });
  }
}
