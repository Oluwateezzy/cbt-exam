import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from '../auth/auth.controller';
import { UsersController } from 'src/users/users.controller';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [],
  controllers: [AppController, AuthController, UsersController],
  providers: [AppService, AuthService, UsersController],
})
export class AppModule {}
