import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { Reputation } from 'src/reputation/entities/reputation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Reputation]), UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
