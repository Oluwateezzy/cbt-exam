import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEmail, IsString, IsEnum, IsArray, ValidateNested } from 'class-validator';
import { CreateCourseDto } from 'src/course/course.dto';

export class CreateUserDto {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsString()
    password: string;

    @ApiProperty({ enum: Role })
    @IsEnum(Role)
    role: Role;

    @ApiProperty()
    @IsString()
    examName: string;

}

export class RegisterUserDto {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsString()
    password: string;

    @ApiProperty({ enum: Role })
    @IsEnum(Role)
    role: Role;

    @ApiProperty()
    @IsString()
    examName?: string;

    @ApiProperty()
    courses?: string[];

}

export class UpdateUserDto extends PartialType(CreateUserDto){}