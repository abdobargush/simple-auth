import { User } from 'src/user/user.schema';

export class UserLoggedInEvent {
  constructor(public readonly user: User) {}
}
