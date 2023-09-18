import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    PassportModule,
    JwtModule.register({secret: 'secrete', signOptions: {expiresIn: '1h'}})
  ],
  controllers: [AppController,],
  providers: [AppService, JwtStrategy]
})
export class AppModule {}
