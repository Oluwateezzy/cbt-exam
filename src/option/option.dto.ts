import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateOptionDto {
    @ApiProperty()
    @IsString()
    A: string;

    @ApiProperty()
    @IsString()
    B: string;

    @ApiProperty()
    @IsString()
    C: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    D?: string;

    @ApiProperty()
    @IsUUID()
    questionId: string;
}

export class UpdateOptionDto extends PartialType(CreateOptionDto) {}
