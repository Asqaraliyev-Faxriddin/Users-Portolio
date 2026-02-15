import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service'; 
import { UpdateUserDto, CreateResumeDto, UpdateResumeDto, CreateExperienceDto, UpdateExperienceDto } from './dto/create-profile.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}


  async updateUser(userId: string, dto: UpdateUserDto, avatarUrl?: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        ...dto,
        ...(avatarUrl ? { avatar_url: avatarUrl } : {}), 
      },
    });
  }


  async createResume(userId: string, dto: CreateResumeDto, fileUrl: string) {
    
    return this.prisma.resume.create({
      data: {
        userId,
        title: dto.title,
        summary: dto.summary,
        experience: dto.experience,
        fileUrl,
      },
    });
  }

  async updateResume(userId:string,resumeId: string, dto: UpdateResumeDto, fileUrl?: string) {
    const resume = await this.prisma.resume.findFirst({ where: { id: resumeId,userId } });
    if (!resume) throw new NotFoundException('Resume not found');

    return this.prisma.resume.update({
      where: { id: resumeId },
      data: {
        ...dto,
        ...(fileUrl ? { fileUrl } : {}),
      },
    });
  }


  async createExperience(userId: string, dto: CreateExperienceDto) {
    return this.prisma.experience.create({
      data: {
        userId,
        companyName: dto.companyName,
        position: dto.position,
        startDate: new Date(dto.startDate),
        endDate: dto.endDate ? new Date(dto.endDate) : null,
      },
    });
  }

  async updateExperience(userId:string,expId: number, dto: UpdateExperienceDto) {
    const exp = await this.prisma.experience.findFirst({ where: { id: expId,userId } });
    if (!exp) throw new NotFoundException('Experience not found');

    return this.prisma.experience.update({
      where: { id: expId },
      data: {
        companyName: dto.companyName,
        position: dto.position,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
      },
    });
  }


  async getUserProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        resumes: true,      
        experiences: true,  
      },
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }
}
