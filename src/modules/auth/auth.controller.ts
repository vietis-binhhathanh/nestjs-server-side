import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from '../../models/user.model';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post('/register')
  @UsePipes(ValidationPipe)
  register(@Body(ValidationPipe) credentials: RegisterDTO) {
    return this.authService.register(credentials);
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  login(@Body(ValidationPipe) credentials: LoginDTO) {
    return this.authService.login(credentials);
  }
}
