// src/questions/dto/question.dto.ts

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { options } from '@prisma/client';
import { IsString, IsOptional, IsInt, IsUUID, IsEnum, ArrayNotEmpty } from 'class-validator';

export class CreateQuestionDto {
    @ApiProperty()
    @IsString()
    question: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsInt()
    point?: number;

    @ApiProperty({ enum: options })
    @IsEnum(options)
    correctAnswer: options;

    @ApiProperty()
    @IsUUID()
    courseId: string;
}

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {}