import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { loginDto } from './dto/login.dto';
import * as bcrypt from "bcrypt"
import { ResetPasswordDto } from './dto/verification.dto';
import { JWTAccessOptions, JWTRefreshOptions } from 'src/common/config/jwt';
import { PrismaService } from 'src/core/prisma/prisma.service'; 

interface JwtPayload {
    id: string,
    role: string
}


  
@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    private async generateTokens(payload: JwtPayload, accessTokenOnly = false) {

        const accessToken = await this.jwtService.signAsync(payload, JWTAccessOptions);
        if (accessTokenOnly) {
            return { accessToken }
        }
        const refreshToken = await this.jwtService.signAsync({ id: payload.id }, JWTRefreshOptions);

        return { accessToken, refreshToken }

    }


    async login(payload: Required<loginDto>) {
        const email = payload.email.replace(/\s+/g, '');

        
        let user = await this.prisma.user.findFirst({
            where: { email}
        })
        

    
     

        if (!user || !(await bcrypt.compare(payload.password, user.password))) {
            throw new UnauthorizedException("email or password is invalid")
        }

        
        return this.generateTokens({ id: user.id, role: "USER" })
    }

    async refreshToken({ token }: { token: string }) {
        try {
            let payload = await this.jwtService.verifyAsync(token)
            if (!payload?.id) throw new UnauthorizedException()

            return this.generateTokens({ id: payload.id, role: payload.role }, true)
        } catch (error) {
            throw new UnauthorizedException("Invalid or expired refresh token")
        }
    }


}
