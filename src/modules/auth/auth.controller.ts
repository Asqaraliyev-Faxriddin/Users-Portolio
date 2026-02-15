import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';
import { refreshTokenDto } from './dto/refresh-token.dto';
import { ResetPasswordDto } from './dto/verification.dto';
import { ApiOperation } from '@nestjs/swagger';


@Controller('api/v1/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }



    @Post('login')
    login(@Body() payload: loginDto) {
        return this.authService.login(payload)
    }

    @Post('refresh-token')
    refreshToken(@Body() token: refreshTokenDto) {
        return this.authService.refreshToken(token)
    }

}