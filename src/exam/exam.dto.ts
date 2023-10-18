// src/exams/dto/exam.dto.ts

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, Min, IsDate, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateExamDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsInt()
    @Min(0)
    maxScore?: number;

    @ApiProperty({ type: String, format: 'date-time' })
    @IsDate()
    startDate: Date;

    @ApiProperty({ type: String, format: 'date-time' })
    @IsDate()
    endDate: Date;
}

export class UpdateExamDto extends PartialType(CreateExamDto){}
