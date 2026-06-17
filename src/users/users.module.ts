import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ReputationModule } from 'src/reputation/reputation.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ReputationModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
