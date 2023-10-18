import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrimaService } from 'src/prima/prima.service';

@Injectable()
export class QuestionService {
    constructor(private prisma: PrimaService){}
    async create(data) {
        try {
            const question = await this.prisma.question.create({
                ...data
            })
            return {
                status: HttpStatus.CREATED,
                data: question
            }
        } catch (err) {
            throw new HttpException(`${err.message}`, HttpStatus.BAD_REQUEST)
        }
    }
    async findAll() {
        try {
            const questions = await this.prisma.question.findMany({
                include: {
                    options: true,
                    Response: true
                }
            })
            return {
                status: HttpStatus.OK,
                data: questions
            }
        } catch (err) {
            throw new HttpException(`${err.message}`, HttpStatus.BAD_REQUEST)
        }
    }
    async findOne(id) {
        try {
            const question = await this.prisma.question.findUnique({
                where: {
                    id
                },
                include: {
                    options: true,
                    Response: true
                }
            })
            if (!question) {
                throw new HttpException('Question not found', HttpStatus.NOT_FOUND)
            }
            return {
                status: HttpStatus.OK,
                data: question
            }
        } catch (err) {
            throw new HttpException(`${err.message}`, HttpStatus.BAD_REQUEST)
        }
    }
    async update(id, data) {
        try {
            const question = await this.prisma.question.findUnique({
                where: {
                    id
                }
            })
            if (!question) {
                throw new HttpException('Question not found', HttpStatus.NOT_FOUND)
            }
            const result = await this.prisma.question.update({
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
    async delete(id) {
        try {
            const question = await this.prisma.question.findUnique({
                where: {
                    id
                }
            })
            if (!question) {
                throw new HttpException('Question not found', HttpStatus.NOT_FOUND)
            }
            await this.prisma.question.delete({
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
