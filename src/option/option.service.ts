import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrimaService } from 'src/prima/prima.service';

@Injectable()
export class OptionService {
    constructor(private prisma: PrimaService){}
    async create(data) {
        try {
            const option = await this.prisma.option.create({
                ...data
            })
            return {
                status: HttpStatus.CREATED,
                data: option
            }
        } catch (err) {
            throw new HttpException(`${err.message}`, HttpStatus.BAD_REQUEST)
        }
    }
    async findAll() {
        try {
            const options = await this.prisma.option.findMany({})
            return {
                status: HttpStatus.OK,
                data: options
            }
        } catch (err) {
            throw new HttpException(`${err.message}`, HttpStatus.BAD_REQUEST)
        }
    }
    async findOne(id) {
        try {
            const option = await this.prisma.option.findUnique({
                where: {
                    id
                }
            })
            if (!option) {
                throw new HttpException('Option not found', HttpStatus.NOT_FOUND)
            }
            return {
                status: HttpStatus.OK,
                data: option
            }
        } catch (err) {
            throw new HttpException(`${err.message}`, HttpStatus.BAD_REQUEST)
        }
    }
    async update(id, data) {
        try {
            const option = await this.prisma.option.findUnique({
                where: {
                    id
                }
            })
            if (!option) {
                throw new HttpException('Option not found', HttpStatus.NOT_FOUND)
            }
            const result  = await this.prisma.option.update({
                where: {
                    id
                },
                data: { ...data }
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
            const option = await this.prisma.option.findUnique({
                where: {
                    id
                }
            })
            if (!option) {
                throw new HttpException('Option not found', HttpStatus.NOT_FOUND)
            }
            await this.prisma.option.delete({
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
