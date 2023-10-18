import { Controller, Get, Param, Request, Post, Body, UseGuards, Put, Delete, HttpStatus, HttpCode} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from "src/auth/roles/roles.decorator"
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { Role } from '@prisma/client';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth('JWT')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Post("")
    @HttpCode(HttpStatus.CREATED)
    @ApiOkResponse({ description: 'Create User' })
    @Roles(Role.STUDENT, Role.ADMIN)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiBody({ type: CreateUserDto })
    async create(@Body() data: CreateUserDto) {
        return this.usersService.create(data)
    }

    @Get("")
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Get all users' })
    @Roles(Role.ADMIN)
    @UseGuards(JwtAuthGuard, RoleGuard)
    async name() {
        return this.usersService.getAll()
    }

    @Get(":id")
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Get User' })
    @Roles(Role.STUDENT, Role.ADMIN)
    @UseGuards(JwtAuthGuard, RoleGuard)
    async getOne(@Param('id') id: string) {
        return this.usersService.getOne(id)
    }

    @Get("/score/:id")
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: "Get User's Score" })
    @Roles(Role.STUDENT, Role.ADMIN)
    @UseGuards(JwtAuthGuard, RoleGuard)
    async score(@Param('id') id: string) {
        return this.usersService.score(id)
    }

    @Put(":id")
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Update User' })
    @Roles(Role.STUDENT, Role.ADMIN)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiBody({type: UpdateUserDto})
    async update(@Param('id') id: string, @Body() data: UpdateUserDto){
        return this.usersService.update(id, data)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Delete User' })
    @Roles(Role.STUDENT, Role.ADMIN)
    @UseGuards(JwtAuthGuard, RoleGuard)
    async delete(@Param('id') id: string) {
        return this.usersService.delete(id)
    }
}
