import { Module } from '@nestjs/common';
import { UsersController } from './profile.controller';
import { UsersService } from './profile.service';
import { JwtModule } from '@nestjs/jwt';
import { JWTAccessOptions } from 'src/common/config/jwt';
import { SeederService } from 'src/common/seader/seader.service';


@Module({
  imports:[JwtModule.register(JWTAccessOptions)],
  controllers: [UsersController],
  providers: [UsersService,SeederService],
})
export class ProfileModule {}
