import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrimaService } from 'src/prima/prima.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';

@Module({
  providers: [UsersService, PrimaService, JwtAuthGuard, RoleGuard],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
