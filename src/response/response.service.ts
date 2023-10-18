import { HttpException, HttpStatus, Injectable, Delete } from '@nestjs/common';
import { PrimaService } from 'src/prima/prima.service';

@Injectable()
export class ResponseService {
    constructor(private prisma: PrimaService){}
    async create(data) {
        try {
            const response = await this.prisma.response.create({
                data: {...data}
            })
            return {
                status: HttpStatus.CREATED,
                data: response
            }
        } catch (err) {
            throw new HttpException(`${err.message}`, HttpStatus.BAD_REQUEST)
        }
    }
    async createMany(data) {
        try {
            const responses = await this.prisma.response.createMany({
                data: {...data}
            })
            return {
                status: HttpStatus.CREATED,
                data: responses
            }
        } catch (err) {
            throw new HttpException(`${err.message}`, HttpStatus.BAD_REQUEST)
        }
    }
    async findAll() {
        try {
            const responses = await this.prisma.response.findMany({})
            return {
                status: HttpStatus.OK,
                data: responses
            }
        } catch (err) {
            throw new HttpException(`${err.message}`, HttpStatus.BAD_REQUEST)
        }
    }
    async findOne(id) {
        try {
            const response = await this.prisma.response.findUnique({
                where: {
                    id
                }
            })
            if (!response) {
                throw new HttpException("Response not found", HttpStatus.NOT_FOUND)
            }
            return {
                status: HttpStatus.OK,
                data: response
            }
        } catch (err) {
            throw new HttpException(`${err.message}`, HttpStatus.BAD_REQUEST)
        }
    }
    async update(id, data) {
        try {
            const response = await this.prisma.response.findUnique({
                where: {
                    id
                }
            })
            if (!response) {
                throw new HttpException("Response not found", HttpStatus.NOT_FOUND)
            }
            const updatedResponse = await this.prisma.response.update({
                where: {
                    id
                },
                data: { ...data }
            })
            return {
                status: HttpStatus.OK,
                data: updatedResponse
            }
        } catch (err) {
            throw new HttpException(`${err.message}`, HttpStatus.BAD_REQUEST)
        }
    }
    async delete(id) {
        try {
            const response = await this.prisma.response.findUnique({
                where: {
                    id
                }
            })
            if (!response) {
                throw new HttpException("Response not found", HttpStatus.NOT_FOUND)
            }
            await this.prisma.response.delete({
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
