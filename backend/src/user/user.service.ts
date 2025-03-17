import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import mongoose from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModle: mongoose.Model<User>,
  ) {}

  async create(user: User): Promise<User> {
    return await this.userModle.create(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModle.findOne({ email });
    return user;
  }
}
