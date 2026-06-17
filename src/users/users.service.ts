import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Future, NetResponse, ResponseHelper } from 'src/helpers/net-response';
import * as bcrypt from 'bcrypt';
import { ReputationService } from 'src/reputation/reputation.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly reputationService: ReputationService,
  ) {}

  async create(createUserDto: CreateUserDto): Future<NetResponse> {
    try {
      const user = this.userRepository.create(createUserDto);
      const hashPassword = await bcrypt.hash(createUserDto.password, 10);
      user.password = hashPassword;
      const savedUser = await this.userRepository.save(user);
      await this.reputationService.create({
        user_id: savedUser.id,
        reputation_count: 0,
      });
      return ResponseHelper.success<User & { reputation_count: number }>(
        'User created successfully',
        {
          ...savedUser,
          reputation_count: 0,
        },
      );
    } catch (error) {
      return ResponseHelper.fromError(error);
    }
  }

  async findAll(): Future<NetResponse> {
    try {
      const users = await this.userRepository.find();
      return ResponseHelper.success<User[]>(
        'Users fetched successfully',
        users,
      );
    } catch (error) {
      return ResponseHelper.fromError(error);
    }
  }

  async findOne(id: number): Future<NetResponse> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user)
        return ResponseHelper.error<User>(`User with ID ${id} not found`);
      return ResponseHelper.success<User>('User fetched successfully', user);
    } catch (e) {
      return ResponseHelper.fromError(e);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Future<NetResponse> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user)
        return ResponseHelper.error<User>(`User with ID ${id} not found`);
      await this.userRepository.update(id, updateUserDto);
      return ResponseHelper.success<User>('User updated successfully', user);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      return ResponseHelper.fromError(error);
    }
  }

  async deleteUser(id: number) {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        return ResponseHelper.error<User>(`User with ID ${id} not found`);
      }
      await this.userRepository.remove(user);
      return ResponseHelper.success<User>('User removed successfully', user);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        `Failed to remove user with ID ${id}`,
      );
    }
  }
  async findUserWithCommunity(id: number): Future<NetResponse> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: {
          community: true,
        },
      });
      if (!user) return ResponseHelper.error('User not found');

      return ResponseHelper.success(
        "User's community fetched successfully",
        user,
      );
    } catch (error) {
      return ResponseHelper.fromError(error);
    }
  }
}
