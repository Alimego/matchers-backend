import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { loginDto, registerDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async register(dto: registerDto) {
    const { name, email, password } = dto;

    const hashedPassword = await argon2.hash(password);

    try {
      const user = await this.prisma.user.create({
        data: { name, email, password: hashedPassword },
      });
      const access_token = this.jwt.sign({
        id: user.id,
        email: user.email,
        name: user.name,
      });

      return {
        message: 'User registered successfully',
        user,
        access_token,
      };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('User already exists');
      }
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async login(dto: loginDto) {
    const { email, password } = dto;
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user || !(await argon2.verify(user.password, password))) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const access_token = this.jwt.sign({
        id: user.id,
        email: user.email,
        name: user.name,
      });

      return {
        message: 'Login successfully',
        user,
        access_token,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
