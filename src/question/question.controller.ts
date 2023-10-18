import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { QuestionService } from './question.service';
import { CreateQuestionDto, UpdateQuestionDto } from './question.dto';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/roles/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';

@ApiTags('Question Module')
@Controller('question')
@ApiBearerAuth('JWT')
export class QuestionController {
    constructor(private questionService: QuestionService){}

    @Post('')
    @HttpCode(HttpStatus.CREATED)
    @ApiOkResponse({ description: 'Create Question' })
    @Roles(Role.ADMIN,)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiBody({ type: CreateQuestionDto })
    async create(@Body() data: CreateQuestionDto) {
        return this.questionService.create(data)
    }

    @Get('')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Get all Questions' })
    @Roles(Role.ADMIN, Role.INSTRUCTOR, Role.STUDENT)
    @UseGuards(JwtAuthGuard, RoleGuard)
    async findAll() {
        return this.questionService.findAll()
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Get Question' })
    @Roles(Role.ADMIN, Role.STUDENT, Role.INSTRUCTOR)
    @UseGuards(JwtAuthGuard, RoleGuard)
    async findOne(@Param('id') id: string) {
        return this.questionService.findOne(id)
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Update Question' })
    @Roles(Role.ADMIN)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiBody({ type: UpdateQuestionDto })
    async update(@Param('id') id: string, @Body() data: UpdateQuestionDto) {
        return this.questionService.update(id, data)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Delete Question' })
    @Roles(Role.ADMIN)
    @UseGuards(JwtAuthGuard, RoleGuard)
    async delete(@Param('id') id: string) {
        return this.questionService.delete(id)
    }
}
