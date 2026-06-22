import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login-user')
  login(@Body() loginDto: LoginDto) {
    return this.authService.validateUser(loginDto);
  }
  @Post('/login-admin')
  register(@Body() registerDto: LoginDto) {
    return this.authService.validateAdmin(registerDto);
  }
  @Get('/ping-server')
  pingServer() {
    return this.authService.pingServer();
  }
}
