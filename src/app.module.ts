import { Module } from '@nestjs/common';
import { ProfileModule } from './modules/profile/profile.module';
import { PrismaModule } from './core/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ContactModule } from './modules/contact/contact.module';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    ProfileModule, PrismaModule, ContactModule],

})
export class AppModule {}
