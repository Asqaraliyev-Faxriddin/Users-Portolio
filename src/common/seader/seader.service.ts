import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    const password = await bcrypt.hash('12345678', 10);

    await this.prisma.user.upsert({
      where: { email: 'asqaraliyevfaxriddin@gmail.com' }, 
      create: {
        firstName: 'Faxriddin',
        lastName: 'Asqaraliyev',
        email: 'asqaraliyevfaxriddin@gmail.com',
        password,
        avatar_url: '', 
        age: 30,       
      },
      update: {},
    });

    await this.prisma.user.upsert({
      where: { email: 'rustam@gmail.com' },
      create: {
        firstName: 'Rustam',
        lastName: 'Qodirov',
        email: 'rustam@gmail.com',
        password,
        avatar_url: '',
        age: 25,
      },
      update: {},
    });

    await this.prisma.user.upsert({
      where: { email: 'ali@example.com' },
      create: {
        firstName: 'Ali',
        lastName: 'Valiyev',
        email: 'ali@gmail.com',
        password,
        avatar_url: '',
        age: 28,
      },
      update: {},
    });

    console.log('Seeder: 3 ta user yaratildi!');
  }
}
