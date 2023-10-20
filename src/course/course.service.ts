import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './course.dto';
import { PrimaService } from 'src/prima/prima.service';

@Injectable()
export class CourseService {
    constructor(private prisma: PrimaService){}
    async create(data) {
        try {
            const course = await this.prisma.course.create({
                data: {...data}
            })
            return {
                status: HttpStatus.CREATED,
                data: course
            }
        } catch (err) {
            throw new HttpException(`${err.message}`, HttpStatus.BAD_REQUEST)
        }
    }
    async findAll() {
        try {
            const courses = await this.prisma.course.findMany({
                include: {
                    questions: true
                }
            })
            return {
                status: HttpStatus.OK,
                data: courses
            }
        } catch (err) {
            throw new HttpException(`${err.message}`, HttpStatus.BAD_REQUEST)
        }
    }
    async findOne(id) {
        try {
            const course = await this.prisma.course.findUnique({
                where: {
                    id
                },
                include: {
                    questions: true
                }
            })
            if (!course){
                throw new HttpException('Course not found', HttpStatus.NOT_FOUND)
            }
            return {
                status: HttpStatus.OK,
                data: course
            }
        } catch (err) {
            throw new HttpException(`${err.message}`, HttpStatus.BAD_REQUEST)
        }
    }
    async update(id, data) {
        try {
            const course = await this.prisma.course.findUnique({
                where: {
                    id
                }
            })
            if (!course) {
                throw new HttpException('Course not found', HttpStatus.NOT_FOUND)
            }
            const result = await this.prisma.course.update({
                where: {
                    id
                },
                data: {...data}
            })
            return {
                status: HttpStatus.OK,
                data: result
            }
        } catch (err) {
            throw new HttpException(`${err.message}`, HttpStatus.BAD_REQUEST)
        }
    }
    async delete(id: string) {
        try {
            const course = await this.prisma.course.findUnique({
                where: {
                    id
                }
            })
            if (!course) {
                throw new HttpException('Course not found', HttpStatus.NOT_FOUND)
            }
            await this.prisma.course.delete({
                where: {
                    id
                }
            })
            return {
                status: HttpStatus.OK,
                data: {}
            }
        } catch (err) {
            throw new HttpException(`${err.message}`, HttpStatus.BAD_REQUEST)
        }
    }
}
