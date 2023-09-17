import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];
  async login(data){
    const user = this.users.find((user) => user.username == data.username)
    if (user && data.password == user.password){
        return {
            status: HttpStatus.OK,
            data: user
        }
    }
  }
}
