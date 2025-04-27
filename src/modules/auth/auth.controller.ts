import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { COOKIE_OPTIONS } from 'src/config/cookie.config';
import { Public } from './decorator/public.decorator';
import { RegisterDto } from './dtos/register.dto';
import { Request, Response } from 'express';
import { LoginDto } from './dtos/login.dto';
import { User } from '../users/entities/user.entity';
import { CurrentUser } from './decorator/current-user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.register(registerDto);

    res.cookie('access_token', tokens.accessToken, COOKIE_OPTIONS);
    res.cookie('refresh_token', tokens.refreshToken, COOKIE_OPTIONS);

    return { message: 'Registration successful' };
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.login(loginDto);

    res.cookie('access_token', tokens.accessToken, COOKIE_OPTIONS);
    res.cookie('refresh_token', tokens.refreshToken, COOKIE_OPTIONS);

    return { message: 'Login successful' };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async logout(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.logout(user.id);

    res.clearCookie('access_token', COOKIE_OPTIONS);
    res.clearCookie('refresh_token', COOKIE_OPTIONS);

    return { message: 'Logout successful' };
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userId = (req.user as User & { sub: string }).sub;
    const refreshToken = req.cookies.refresh_token;

    const tokens = await this.authService.refreshTokens(userId, refreshToken);

    res.cookie('access_token', tokens.accessToken, COOKIE_OPTIONS);
    res.cookie('refresh_token', tokens.refreshToken, COOKIE_OPTIONS);

    return { message: 'Token refresh successful' };
  }
}
