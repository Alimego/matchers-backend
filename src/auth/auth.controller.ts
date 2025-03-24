import { Body, Controller, Post } from '@nestjs/common';
import { loginDto, registerDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() user: registerDto) {
    return this.authService.register(user);
  }

  @Post('login')
  login(@Body() user: loginDto) {
    return this.authService.login(user);
  }
}
