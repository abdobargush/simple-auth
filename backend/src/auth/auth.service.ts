import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.schema';
import { TokenResponse } from 'src/types';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserRegisteredEvent } from './events/user-registered.event';
import { UserLoggedInEvent } from './events/user-loggedin.event';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private eventEmitter: EventEmitter2,
  ) {}

  async login({ email, password }: LoginDto): Promise<TokenResponse> {
    const user = await this.userService.findByEmail(email);

    if (!user) throw new UnauthorizedException('Invalid email or password');

    const isPasswordMathced = await bcrypt.compare(password, user.password);
    if (!isPasswordMathced)
      throw new UnauthorizedException('Invalid email or password');

    const response = this.generateToken(user);

    this.eventEmitter.emit('user.loggedin', new UserLoggedInEvent(user));

    return response;
  }

  async register(data: CreateUserDto): Promise<TokenResponse> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    if (await this.userService.findByEmail(data.email))
      throw new BadRequestException('Email already exists');

    const user = await this.userService.create({
      ...data,
      password: hashedPassword,
    } as User);

    const response = this.generateToken(user);

    this.eventEmitter.emit('user.registered', new UserRegisteredEvent(user));

    return response;
  }

  private generateToken(user: User): TokenResponse {
    const payload = { id: user._id, name: user.name };
    return { token: this.jwtService.sign(payload) };
  }
}
