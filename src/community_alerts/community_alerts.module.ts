import { Module } from '@nestjs/common';
import { CommunityAlertsService } from './community_alerts.service';
import { CommunityAlertsController } from './community_alerts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityAlert } from './entities/community_alert.entity';
import { GatewayModule } from 'src/gateway/gateway.module';

@Module({
  imports: [TypeOrmModule.forFeature([CommunityAlert]), GatewayModule],
  controllers: [CommunityAlertsController],
  providers: [CommunityAlertsService],
})
export class CommunityAlertsModule {}
