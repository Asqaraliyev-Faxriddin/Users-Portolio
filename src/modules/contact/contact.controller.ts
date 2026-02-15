import { Controller, Post, Body, Get, Headers } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiHeader } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@ApiTags('Contacts')
@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi contact yaratish va Telegramga yuborish' })
  @ApiHeader({ name: 'device-name', description: 'Qurilma identifikatori', required: true })
  @ApiBody({ type: CreateContactDto })
  @ApiResponse({ status: 201, description: 'Contact muvaffaqiyatli yuborildi.' })
  @ApiResponse({ status: 400, description: '10 minut cheklovi mavjud.' })
  async create(
    @Body() createContactDto: CreateContactDto,
    @Headers('device-name') deviceName: string
  ) {
    if (!deviceName) {
      throw new Error('device-name header mavjud bo‘lishi kerak!');
    }
    return await this.contactService.createContact(createContactDto, deviceName);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha contactlarni olish' })
  @ApiResponse({ status: 200, description: 'Barcha contactlar ro‘yxati.', type: [CreateContactDto] })
  async allContacts() {
    return await this.contactService.allContacts();
  }
}
