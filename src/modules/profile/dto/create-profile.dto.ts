import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsInt, Min, Max, IsDateString } from 'class-validator';
import { Express } from 'express';

// ============================
// User DTO
// ============================
export class UpdateUserDto {
  @ApiPropertyOptional({ description: 'Foydalanuvchi ismi' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({ description: 'Foydalanuvchi familiyasi' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({ description: 'Foydalanuvchi emaili' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ description: 'Foydalanuvchi paroli' })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiPropertyOptional({ description: 'Foydalanuvchi yoshi', minimum: 1, maximum: 150 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(150)
  age?: number;

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
  @ApiProperty({ description: 'Resume sarlavhasi' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ description: 'Resume qisqacha mazmuni' })
  @IsOptional()
  @IsString()
  summary?: string;

  @ApiPropertyOptional({ description: 'Tajriba yillari', minimum: 0 })
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

export class UpdateResumeDto {
  @ApiPropertyOptional({ description: 'Resume sarlavhasi' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'Resume qisqacha mazmuni' })
  @IsOptional()
  @IsString()
  summary?: string;

  @ApiPropertyOptional({ description: 'Tajriba yillari', minimum: 0 })
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
  @ApiProperty({ description: 'Kompaniya nomi' })
  @IsString()
  companyName: string;

  @ApiProperty({ description: 'Lavozim' })
  @IsString()
  position: string;

  @ApiProperty({ description: 'Ish boshlanish sanasi', type: String, format: 'date-time' })
  @IsDateString()
  startDate: string;

  @ApiPropertyOptional({ description: 'Ish tugash sanasi', type: String, format: 'date-time' })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}

export class UpdateExperienceDto {
  @ApiPropertyOptional({ description: 'Kompaniya nomi' })
  @IsOptional()
  @IsString()
  companyName?: string;

  @ApiPropertyOptional({ description: 'Lavozim' })
  @IsOptional()
  @IsString()
  position?: string;

  @ApiPropertyOptional({ description: 'Ish boshlanish sanasi', type: String, format: 'date-time' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({ description: 'Ish tugash sanasi', type: String, format: 'date-time' })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
