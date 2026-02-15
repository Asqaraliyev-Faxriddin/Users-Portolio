import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import axios from 'axios';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  // Device nomi => oxirgi yuborilgan vaqt (millisekundlarda)
  private lastSentMap: Map<string, number> = new Map();


  async createContact(createContactDto: CreateContactDto, deviceName: string) {
    const now = Date.now();

    // 1. Map orqali 10 minutlik cheklovni tekshirish
    const lastSent = this.lastSentMap.get(deviceName);
    if (lastSent && now - lastSent < 10 * 60 * 1000) {
      const remaining = Math.ceil((10 * 60 * 1000 - (now - lastSent)) / 1000);
      throw new BadRequestException(
        `Siz hali ${remaining} soniya ichida yana yubora olmaysiz.`
      );
    }

    // 2. Bazaga saqlash
    const contact = await this.prisma.contact.create({
      data: {
        ...createContactDto,
      },
    });

    // 3. Telegramga yuborish
    const token = process.env.TEL_BOT;
    const chatId = process.env.TEL_CHAT_ID;
    const text = `📩 *Yangi contact:*\n\n` +
      `*Title:* ${contact.title}\n` +
      `*Description:* ${contact.description}\n` +
      `*Phone:* ${contact.phoneNumber}\n` +
      `*Device:* ${deviceName}`;

    try {
      await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
        chat_id: chatId,
        text,
        parse_mode: 'Markdown',
      });
    } catch (error) {
      console.error('Telegram xatolik:', error.message);
    }

    // 4. Mapni yangilash
    this.lastSentMap.set(deviceName, now);

    return { status: 'sent', contact };
  }

  /**
   * Barcha contactlarni olish
   */
  async allContacts() {
    return await this.prisma.contact.findMany();
  }
}
