import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrimaService } from 'src/prima/prima.service';
import { UpdateExamDto } from './exam.dto';

@Injectable()
export class ExamService {
    constructor(private prisma: PrimaService) {}

    async create(data){
        try {
            const exam = await this.prisma.exam.create({
                data: {...data}
            })
            return {
                status: HttpStatus.CREATED,
                data: exam
            }
        } catch (err) {
            throw new HttpException(`${err.message}`, HttpStatus.BAD_REQUEST)
        }
    }
    async findAll(){
        try {
            const exams = await this.prisma.exam.findMany({
                include: {
                    courses: true
                }
            })
            return {
                status: HttpStatus.OK,
                data: exams
            }
        } catch (err) {
            throw new HttpException(`${err.message}`, HttpStatus.BAD_REQUEST)
        }
    }
    async findOne(id: string){
        try {
            const exam = await this.prisma.exam.findUnique({
                where: {
                    id
                },
                include: {
                    courses: true
                }
            })
            if (!exam) {
                throw new HttpException('Exam not found', HttpStatus.NOT_FOUND)
            }
            return {
                status: HttpStatus.OK,
                data: exam
            }
        } catch (err) {
            throw new HttpException(`${err.message}`, HttpStatus.BAD_REQUEST)
        }
    }
    async update(id: string, data: UpdateExamDto){
        try {
            const exam = await this.prisma.exam.findUnique({
                where: {
                    id
                }
            })
            if (!exam) {
                throw new HttpException('Exam not found', HttpStatus.NOT_FOUND)
            }
            const result = await this.prisma.exam.update({
                where: {
                    id,
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
    async delete(id){
        try {
            const exam = await this.prisma.exam.findUnique({
                where: {
                    id
                }
            })
            if (!exam) {
                throw new HttpException('Exam not found', HttpStatus.NOT_FOUND)
            }
            await this.prisma.exam.delete({
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
