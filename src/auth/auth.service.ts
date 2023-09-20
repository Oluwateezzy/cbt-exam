import { Injectable, UnauthorizedException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { User } from '@prisma/client'
import { PrimaService } from 'src/prima/prima.service';
import { userdto } from './dto/user.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrimaService){}
  async validate(data: userdto){
    const user = await this.prisma.user.findUnique({
      where: {
        username: data.username
      }
    })
    if (user && data.password == user.password){
      const token = sign({...user}, 'secrete')
      return {token, user}
    }
    throw new UnauthorizedException()
  }
}
