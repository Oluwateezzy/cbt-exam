import { Controller, Post, Get, Put, Delete, Body, Param, HttpCode, UseGuards, HttpStatus } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateExamDto, UpdateExamDto } from './exam.dto';
import { Roles } from 'src/auth/roles/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Role } from '@prisma/client';

@ApiTags('Exam Module')
@Controller('exam')
@ApiBearerAuth('JWT')
export class ExamController {
    constructor(private examService: ExamService){}

    @Post('')
    @HttpCode(HttpStatus.CREATED)
    @ApiOkResponse({ description: 'Create Exam' })
    @Roles(Role.ADMIN)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiBody({ type: CreateExamDto })
    async create(@Body() data: CreateExamDto){
        return this.examService.create(data)
    }

    @Get('')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Get all Exams' })
    @Roles(Role.ADMIN)
    @UseGuards(JwtAuthGuard, RoleGuard)
    async findAll(){
        return this.examService.findAll()
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Get Exam' })
    @Roles(Role.ADMIN, Role.STUDENT)
    @UseGuards(JwtAuthGuard, RoleGuard)
    async findOne(@Param('id') id: string){
        return this.examService.findOne(id)
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Update Exam' })
    @Roles(Role.ADMIN)
    @UseGuards(JwtAuthGuard, RoleGuard)
    async update(@Param('id') id: string, @Body() data: UpdateExamDto){
        return this.examService.update(id, data)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Delete Exam' })
    @Roles(Role.ADMIN)
    @UseGuards(JwtAuthGuard, RoleGuard)
    async delete(@Param('id') id: string){
        return this.examService.delete(id)
    }
}
