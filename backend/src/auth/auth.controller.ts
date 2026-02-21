import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() data: any) {
    return this.authService.signUp(data);
  }

  @Post('login')
  login(@Body() data: any) {
    return this.authService.signIn(data);
  }
}