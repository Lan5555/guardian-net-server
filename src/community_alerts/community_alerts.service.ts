import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommunityAlertDto } from './dto/create-community_alert.dto';
import { UpdateCommunityAlertDto } from './dto/update-community_alert.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommunityAlert } from './entities/community_alert.entity';
import { Future, NetResponse, ResponseHelper } from 'src/helpers/net-response';

@Injectable()
export class CommunityAlertsService {
  constructor(
    @InjectRepository(CommunityAlert)
    private readonly communityAlertRepository: Repository<CommunityAlert>,
  ) {}

  async create(
    createCommunityAlertDto: CreateCommunityAlertDto,
  ): Future<NetResponse> {
    try {
      const alert = this.communityAlertRepository.create(
        createCommunityAlertDto,
      );
      await this.communityAlertRepository.save(alert);
      return ResponseHelper.success<CommunityAlert>(
        'Community alert created successfully',
        alert,
      );
    } catch (error) {
      return ResponseHelper.fromError(error);
    }
  }

  async findAll(): Future<NetResponse> {
    try {
      const alerts = await this.communityAlertRepository.find();
      return ResponseHelper.success<CommunityAlert[]>(
        'Community alerts fetched successfully',
        alerts,
      );
    } catch (error) {
      return ResponseHelper.fromError(error);
    }
  }

  async findOne(id: number) {
    const alert = await this.communityAlertRepository.findOneBy({ id });
    if (!alert) throw new NotFoundException(`Community Alert #${id} not found`);
    return alert;
  }

  async update(id: number, updateCommunityAlertDto: UpdateCommunityAlertDto) {
    const alert = await this.communityAlertRepository.preload({
      id,
      ...updateCommunityAlertDto,
    });
    if (!alert) throw new NotFoundException(`Community Alert #${id} not found`);
    return await this.communityAlertRepository.save(alert);
  }

  async remove(id: number) {
    const alert = await this.findOne(id);
    return await this.communityAlertRepository.remove(alert);
  }
}
