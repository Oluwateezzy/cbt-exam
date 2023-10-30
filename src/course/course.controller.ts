import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { CreateCourseDto, UpdateCourseDto } from './course.dto';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';

@ApiTags('Course Module')
@Controller('course')
@ApiBearerAuth('JWT')
export class CourseController {
    constructor(private courseService: CourseService) {}

    @Post('')
    @HttpCode(HttpStatus.CREATED)
    @ApiOkResponse({ description: 'Create Course' })
    @Roles(Role.ADMIN, Role.INSTRUCTOR)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiBody({ type: CreateCourseDto })
    async create(@Body() data: CreateCourseDto){
        return this.courseService.create(data)
    }
    
    @Get('')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Get all Courses' })
    @Roles(Role.ADMIN, Role.INSTRUCTOR)
    @UseGuards(JwtAuthGuard, RoleGuard)
    async findAll(){
        return this.courseService.findAll()
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Get Course' })
    @Roles(Role.ADMIN, Role.INSTRUCTOR)
    @UseGuards(JwtAuthGuard, RoleGuard)
    async findOne(@Param('id') id: string){
        return this.courseService.findOne(id)
    }

    @Get('getUserCourses')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Get Course' })
    @Roles(Role.ADMIN, Role.INSTRUCTOR)
    @UseGuards(JwtAuthGuard, RoleGuard)
    async getUserCourses(@Req() req){
        return this.courseService.getUserCourses(req.user.id)
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Update Course' })
    @Roles(Role.ADMIN, Role.INSTRUCTOR)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiBody({ type: UpdateCourseDto })
    async update(@Param('id') id: string, @Body() data: UpdateCourseDto){
        return this.courseService.update(id, data)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Delete Course' })
    @Roles(Role.ADMIN)
    @UseGuards(JwtAuthGuard, RoleGuard)
    async delete(@Param('id') id: string){
        return this.courseService.delete(id)
    }
}
