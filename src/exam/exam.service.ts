import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrimaService } from 'src/prima/prima.service';
import { UpdateExamDto } from './exam.dto';

@Injectable()
export class ExamService {
    constructor(private prisma: PrimaService) {}

    async create(data){
        try {
            const exam = await this.prisma.exam.create({
                ...data
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
            const exams = await this.prisma.exam.findMany()
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
                }
            })
            if (!exam) {
                throw new HttpException('User not found', HttpStatus.NOT_ACCEPTABLE)
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
                throw new HttpException('User not found', HttpStatus.NOT_ACCEPTABLE)
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
        } catch (error) {
            
        }
    }
    async delete(id){}
}
