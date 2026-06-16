import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReputationDto } from './dto/create-reputation.dto';
import { UpdateReputationDto } from './dto/update-reputation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reputation } from './entities/reputation.entity';
import { Future, NetResponse, ResponseHelper } from 'src/helpers/net-response';

@Injectable()
export class ReputationService {
  constructor(
    @InjectRepository(Reputation)
    private readonly reputationRepository: Repository<Reputation>,
  ) {}

  async create(createReputationDto: CreateReputationDto): Future<NetResponse> {
    try {
      const reputation = this.reputationRepository.create(createReputationDto);
      await this.reputationRepository.save(reputation);
      return ResponseHelper.success<Reputation>(
        'Reputation created successfully',
        reputation,
      );
    } catch (error) {
      return ResponseHelper.fromError(error);
    }
  }

  async findAll(): Future<NetResponse> {
    try {
      const reputations = await this.reputationRepository.find();
      return ResponseHelper.success<Reputation[]>(
        'Reputations fetched successfully',
        reputations,
      );
    } catch (error) {
      return ResponseHelper.fromError(error);
    }
  }

  async findOne(id: number) {
    const reputation = await this.reputationRepository.findOneBy({ id });
    if (!reputation) throw new NotFoundException(`Reputation #${id} not found`);
    return reputation;
  }

  async update(id: number, updateReputationDto: UpdateReputationDto) {
    const reputation = await this.reputationRepository.preload({
      id,
      ...updateReputationDto,
    });
    if (!reputation) throw new NotFoundException(`Reputation #${id} not found`);
    return await this.reputationRepository.save(reputation);
  }

  async remove(id: number) {
    const reputation = await this.findOne(id);
    return await this.reputationRepository.remove(reputation);
  }
}
