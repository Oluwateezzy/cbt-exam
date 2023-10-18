import { IsEnum, IsString, IsUUID, IsDate } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { options } from '@prisma/client';

export class CreateResponseDto {
    @ApiProperty()
    @IsString()
    examName: string;

    @ApiProperty()
    @IsString()
    courseName: string;

    @ApiProperty({ enum: options, enumName: 'options' })
    @IsEnum(options)
    answer: options;

    @ApiProperty()
    @IsUUID('4')
    userId: string;

    @ApiProperty()
    @IsUUID('4')
    questionId: string;
}

export class UpdateResponseDto extends PartialType(CreateResponseDto) {}
