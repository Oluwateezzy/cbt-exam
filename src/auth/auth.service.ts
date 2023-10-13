import { Injectable, UnauthorizedException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { User } from '@prisma/client'
import { PrimaService } from 'src/prima/prima.service';
import { CreateUserDto } from 'src/users/user.dto';


@Injectable()
export class AuthService {
  constructor(private prisma: PrimaService){}
  async validate(data: CreateUserDto){
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email
      }
    })
    if (user && data.password == user.password){
      const token = sign({...user}, 'secrete')
      return {token, user}
    }
    throw new UnauthorizedException()
  }
}
