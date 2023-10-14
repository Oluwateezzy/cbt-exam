import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { CreateCourseDto, UpdateCourseDto } from './course.dto';

@ApiTags('Course Module')
@Controller('course')
@ApiBearerAuth('JWT')
export class CourseController {
    constructor(private courseService: CourseService) {}
    @Post('')
    async create(@Body() data: CreateCourseDto){
        return this.courseService.create(data)
    }
    @Get('')
    async findAll(){
        return this.courseService.findAll()
    }
    @Get(':id')
    async findOne(@Param('id') id: string){
        return this.courseService.findOne(id)
    }
    @Put(':id')
    async update(@Param('id') id: string, @Body() data: UpdateCourseDto){
        return this.courseService.update(id, data)
    }
    @Delete(':id')
    async delete(@Param('id') id: string){
        return this.courseService.delete(id)
    }
}
