import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ResponseService } from './response.service';
import { CreateResponseDto, UpdateResponseDto } from './response.dto';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/roles/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';

@ApiTags('Response Module')
@Controller('response')
@ApiBearerAuth('JWT')
export class ResponseController {
    constructor(private responseService: ResponseService){}

    @Post('')
    @HttpCode(HttpStatus.CREATED)
    @ApiOkResponse({description: 'Create Response'})
    @Roles(Role.STUDENT, Role.ADMIN)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiBody({ type: CreateResponseDto})
    async create(@Body() data: CreateResponseDto){
        return this.responseService.create(data)
    }

    @Post('/createMany')
    @HttpCode(HttpStatus.CREATED)
    @ApiOkResponse({ description: 'Create Responses' })
    @Roles(Role.ADMIN)
    @UseGuards(JwtAuthGuard, RoleGuard)
    async createMany(@Body() data: CreateResponseDto[]) {
        return this.responseService.createMany(data)
    }

    @Get('')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Get all Responses' })
    @Roles(Role.ADMIN)
    @UseGuards(JwtAuthGuard, RoleGuard)
    async findAll() {
        return this.responseService.findAll()
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Get Response' })
    @Roles(Role.ADMIN, Role.STUDENT)
    @UseGuards(JwtAuthGuard, RoleGuard)
    async findOne(@Param('id') id: string) {
        return this.responseService.findOne(id)
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Update Response' })
    @Roles(Role.ADMIN)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiBody({type: UpdateResponseDto})
    async update(@Param('id') id: string, @Body() data: UpdateResponseDto) {
        return this.responseService.update(id, data)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Delete Response' })
    @Roles(Role.ADMIN)
    @UseGuards(JwtAuthGuard, RoleGuard)
    async delete(@Param('id') id: string) {
        return this.responseService.delete(id)
    }
}
