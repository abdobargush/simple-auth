import { User } from 'src/user/user.schema';

export class UserRegisteredEvent {
  constructor(public readonly user: User) {}
}
