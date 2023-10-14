import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate, IsUUID } from 'class-validator';

export class CreateCourseDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty()
    @IsUUID()
    examId: string;

    @ApiProperty({ type: String, format: 'date-time' })
    @IsDate()
    startDate: Date;

    @ApiProperty({ type: String, format: 'date-time' })
    @IsDate()
    endDate: Date;
}

export class UpdateCourseDto extends PartialType(CreateCourseDto) {}
