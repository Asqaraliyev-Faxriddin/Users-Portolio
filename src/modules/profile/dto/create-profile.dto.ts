import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsInt, Min, Max, IsDateString } from 'class-validator';
import { Express } from 'express';

// ============================
// User DTO
// ============================
export class UpdateUserDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(150)
  age?: number;

  // Fayl uchun: Multer orqali keladi
  @ApiPropertyOptional({ 
    type: 'string', 
    format: 'binary', 
    description: 'User avatar fayli (file upload)' 
  })
  @IsOptional()
  avatar_file?: Express.Multer.File;
}

// ============================
// Resume DTO
// ============================
export class CreateResumeDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  summary?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  experience?: number;

  // Fayl uchun: Multer orqali keladi
  @ApiPropertyOptional({ 
    type: 'string', 
    format: 'binary', 
    description: 'Resume fayli (file upload)' 
  })
  file?: Express.Multer.File;
}

export class UpdateResumeDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  summary?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  experience?: number;

  @ApiPropertyOptional({ 
    type: 'string', 
    format: 'binary', 
    description: 'Resume fayli (file upload)' 
  })
  @IsOptional()
  file?: Express.Multer.File;
}

// ============================
// Experience DTO
// ============================
export class CreateExperienceDto {
  @IsString()
  companyName: string;

  @IsString()
  position: string;

  @IsDateString()
  startDate: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}

export class UpdateExperienceDto {
  @IsOptional()
  @IsString()
  companyName?: string;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}
