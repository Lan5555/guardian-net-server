import { Module } from '@nestjs/common';
import { CommunityAlertsService } from './community_alerts.service';
import { CommunityAlertsController } from './community_alerts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityAlert } from './entities/community_alert.entity';
import { GatewayModule } from 'src/gateway/gateway.module';
import { Reputation } from 'src/reputation/entities/reputation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommunityAlert, Reputation]),
    GatewayModule,
  ],
  controllers: [CommunityAlertsController],
  providers: [CommunityAlertsService],
})
export class CommunityAlertsModule {}
