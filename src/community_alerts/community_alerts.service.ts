/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommunityAlertDto } from './dto/create-community_alert.dto';
import { UpdateCommunityAlertDto } from './dto/update-community_alert.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommunityAlert } from './entities/community_alert.entity';
import { Future, NetResponse, ResponseHelper } from 'src/helpers/net-response';
import { AlertGateway } from 'src/gateway/gateway';
import { Reputation } from 'src/reputation/entities/reputation.entity';
import { TermiiService } from 'src/sms/sms.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CommunityAlertsService {
  constructor(
    @InjectRepository(CommunityAlert)
    private readonly communityAlertRepository: Repository<CommunityAlert>,
    private readonly alertGateway: AlertGateway,
    @InjectRepository(Reputation)
    private readonly reputationRepository: Repository<Reputation>,
    private readonly smsService: TermiiService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    createCommunityAlertDto: CreateCommunityAlertDto,
  ): Future<NetResponse> {
    try {
      const alert = this.communityAlertRepository.create(
        createCommunityAlertDto,
      );
      await this.communityAlertRepository.save(alert);
      this.alertGateway.sendAlert(alert);

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
  async confirmAlert(userId: number, alertId: number): Future<NetResponse> {
    try {
      const alert = await this.communityAlertRepository.findOneBy({
        id: alertId,
      });
      if (!alert) return ResponseHelper.error('No alert found');
      if (alert.reported_id === userId)
        return ResponseHelper.error('Reporter cant confirm alert');
      const reputation = await this.reputationRepository.findOneBy({
        user_id: userId,
      });
      if (!reputation) return ResponseHelper.error('Reputation not found');
      reputation.reputation_count += 10;
      alert.isVerified = true;
      await this.reputationRepository.save(reputation);
      await this.communityAlertRepository.save(alert);
      this.alertGateway.sendAlert(alert);
      return ResponseHelper.success<Reputation | null>(
        'Confirmed Alert successfully',
        null,
      );
    } catch (e) {
      return ResponseHelper.error(e as string);
    }
  }

  async flagAsFalse(alertId: number): Future<NetResponse> {
    try {
      const alert = await this.communityAlertRepository.findOne({
        where: { id: alertId },
        relations: {
          community_id: true,
        } as any,
      });
      if (!alert) return ResponseHelper.error('Community Alert not found');
      const alertDataCopy = { ...alert };
      this.alertGateway.removeAlert(alertDataCopy);
      await this.communityAlertRepository.remove(alert);

      return ResponseHelper.success('Alert flagged as false', null);
    } catch (e) {
      return ResponseHelper.error(e as string);
    }
  }
  async sendBulkSms(
    message: string,
    community_id: number,
  ): Future<NetResponse> {
    try {
      const users = await this.userRepository.find({
        where: {
          community_id,
        },
      });
      const results = await Promise.all(
        users.map((user) => this.smsService.sendBulkSms([user.phone], message)),
      );
      return ResponseHelper.success(
        'Messages sent successfully to users',
        results,
      );
    } catch (e) {
      return ResponseHelper.error(e as string, null);
    }
  }
}
