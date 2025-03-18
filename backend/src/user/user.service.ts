import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import mongoose from 'mongoose';
import { LoggedEvent } from 'src/types';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async create(user: User): Promise<User> {
    return await this.userModel.create(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async logUserEvent(user: User, log: LoggedEvent): Promise<User> {
    user.log.push(log);
    return await user.save();
  }
}
