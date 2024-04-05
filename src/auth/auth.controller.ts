import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/registerDTO';
import { LoginDTO } from './dto/loginDTO';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(@Body() registObj: RegisterDTO) {
    const result = await this.authService.register(registObj);
    return result;
  }

  @Post('/login')
  async login(@Body() loginObj: LoginDTO) {
    const result = await this.authService.login(loginObj);
    return result;
  }
}
