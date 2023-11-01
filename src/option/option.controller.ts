import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { OptionService } from './option.service';
import { CreateOptionDto, UpdateOptionDto } from './option.dto';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/roles/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';

@ApiTags('Option Module')
@Controller('option')
@ApiBearerAuth('JWT')
export class OptionController {
    constructor(private optionService: OptionService) {}

    @Post('')
    @HttpCode(HttpStatus.CREATED)
    @ApiOkResponse({ description: 'Create Option' })
    @Roles(Role.INSTRUCTOR, Role.ADMIN)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiBody({ type: CreateOptionDto })
    async create(@Body() data: CreateOptionDto) {
        return this.optionService.create(data)
    }

    @Get('')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Find all Options' })
    @Roles(Role.ADMIN)
    @UseGuards(JwtAuthGuard, RoleGuard)
    async findAll() {
        return this.optionService.findAll()
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Get Option' })
    @Roles(Role.ADMIN, Role.STUDENT, Role.INSTRUCTOR)
    @UseGuards(JwtAuthGuard, RoleGuard)
    async findOne(@Param('id') id: string) {
        return this.optionService.findOne(id)
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Update Option' })
    @Roles(Role.ADMIN, Role.INSTRUCTOR)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiBody({ type: UpdateOptionDto })
    async update(@Param('id') id: string, @Body() data: UpdateOptionDto){
        return this.optionService.update(id, data)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Delete Option' })
    @Roles(Role.ADMIN, Role.INSTRUCTOR)
    @UseGuards(JwtAuthGuard, RoleGuard)
    async delete(@Param('id') id: string) {
        return this.optionService.delete(id)
    }
}
