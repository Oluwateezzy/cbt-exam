import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PrimaService } from 'src/prima/prima.service';

@Module({
  providers: [AuthService, PrimaService],
  imports: [UsersModule],
  controllers: [AuthController]
})
export class AuthModule {}
