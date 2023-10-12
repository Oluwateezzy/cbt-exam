import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEmail, IsString, IsEnum } from 'class-validator';

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
}

export class UpdateUserDto extends PartialType(CreateUserDto){}