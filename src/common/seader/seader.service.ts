import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    const password = await bcrypt.hash('12345678', 10);

    // Array bilan barcha userlarni saqlash, kodni soddalashtirish
    const users = [
      {
        firstName: 'Faxriddin',
        lastName: 'Asqaraliyev',
        email: 'asqaraliyevfaxriddin@gmail.com',
        age: 30,
      },
      {
        firstName: 'Rustam',
        lastName: 'Qodirov',
        email: 'rustam@gmail.com',
        age: 25,
      },
      {
        firstName: 'Ali',
        lastName: 'Valiyev',
        email: 'ali@gmail.com',
        age: 28,
      },
    ];

    for (const u of users) {
      await this.prisma.user.upsert({
        where: { email: u.email },
        create: {
          ...u,
          password,
          avatar_url: '',
        },
        update: {
          firstName: u.firstName,
          lastName: u.lastName,
          password,
          avatar_url: '',
          age: u.age,
        },
      });
    }

    console.log('Seeder: 3 ta user yaratildi yoki update qilindi!');
  }
}
