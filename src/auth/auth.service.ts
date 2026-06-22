import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Future, NetResponse, ResponseHelper } from 'src/helpers/net-response';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { Reputation } from 'src/reputation/entities/reputation.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Reputation)
    private readonly reputationRepository: Repository<Reputation>,
  ) {}
  async validateUser(val: LoginDto): Future<NetResponse> {
    const user = await this.userRepository.findOne({
      where: { email: val.email },
    });
    if (!user) {
      return ResponseHelper.error<User>('User not found');
    }
    const reputation = await this.reputationRepository.findOne({
      where: { user_id: user.id },
    });

    const decryptPassword = await bcrypt.compare(val.password, user.password);
    if (user && decryptPassword) {
      return ResponseHelper.success<User & { reputation_count: number }>(
        'User logged in successfully',
        {
          id: user.id,
          name: user.name,
          email: user.email,
          community_id: user.community_id,
          reputation_count: reputation?.reputation_count,
          phone: user.phone,
        } as User & { reputation_count: number },
      );
    } else {
      return ResponseHelper.error<User>('Invalid credentials');
    }
  }
  validateAdmin(val: LoginDto): NetResponse {
    if (
      val.email === process.env.ADMIN_EMAIL &&
      val.password === process.env.ADMIN_PASSWORD
    ) {
      return ResponseHelper.success<User>('Admin logged in successfully');
    } else {
      return ResponseHelper.error<User>('Invalid credentials');
    }
  }

  pingServer() {
    return ResponseHelper.success('Server Ready', null);
  }
}
