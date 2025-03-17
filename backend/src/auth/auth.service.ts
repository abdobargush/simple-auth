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

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDto): Promise<TokenResponse> {
    const user = await this.userService.findByEmail(email);

    if (!user) throw new UnauthorizedException('Invalid email or password');

    const isPasswordMathced = await bcrypt.compare(password, user.password);
    if (!isPasswordMathced)
      throw new UnauthorizedException('Invalid email or password');

    return this.generateToken(user);
  }

  async register(data: CreateUserDto): Promise<TokenResponse> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    if (await this.userService.findByEmail(data.email))
      throw new BadRequestException('Email already exists');

    const user = await this.userService.create({
      ...data,
      password: hashedPassword,
    } as User);

    return this.generateToken(user);
  }

  private generateToken(user: User): TokenResponse {
    const payload = { id: user._id, name: user.name };
    return { token: this.jwtService.sign(payload) };
  }
}
