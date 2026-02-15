import { 
  Controller, Get, Patch, Body, UploadedFile, UseInterceptors, UseGuards, Param, 
  Req,
  Post
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UsersService } from './profile.service'; 
import { UpdateUserDto, CreateResumeDto, UpdateResumeDto, CreateExperienceDto, UpdateExperienceDto } from './dto/create-profile.dto';
import { AuthGuard } from 'src/common/guards/jwt-auth.gurads'; 
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';

@Controller('profile')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Patch()
  @UseInterceptors(
    FileInterceptor('avatar_file', {
      storage: diskStorage({
        destination: './uploads', 
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  async updateProfile(
    @Req() req,
    @Body() dto: UpdateUserDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const avatarUrl = file ? `/uploads/${file.filename}` : undefined;
    return this.usersService.updateUser(req.user.id, dto, avatarUrl);
  }

  @Post('resume')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  async createResume(
    @Req() req,
    @Body() dto: CreateResumeDto,
    @UploadedFile() file?: Express.Multer.File,
    
  ) {
    const fileUrl = file ? `/uploads/${file.filename}` : '';
    return this.usersService.createResume(req.user.id, dto, fileUrl);
  }


  @Patch('resume/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  async updateResume(
    @Req() req,
    @Param('id') resumeId: string,
    @Body() dto: UpdateResumeDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const fileUrl = file ? `/uploads/${file.filename}` : undefined;
    return this.usersService.updateResume(req.user.id,resumeId, dto, fileUrl);
  }


  @Post('experience')
  async createExperience(
    @Req() req,
    @Body() dto: CreateExperienceDto,
  ) {
    return this.usersService.createExperience(req.user.id, dto);
  }

  // =========================
  // Experience update
  // =========================
  @Patch('experience/:id')
  async updateExperience(
    @Param('id') expId: number,
    @Body() dto: UpdateExperienceDto,
    @Req() req
  ) {
    return this.usersService.updateExperience(req.user.id,expId, dto);
  }

  // =========================
  // User profile olish
  // =========================
  @Get()
  async getProfile(@Req() req) {
    return this.usersService.getUserProfile(req.user.id);
  }
}
