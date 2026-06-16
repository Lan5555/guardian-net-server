import { Module } from '@nestjs/common';
import { CommunityAlertsService } from './community_alerts.service';
import { CommunityAlertsController } from './community_alerts.controller';

@Module({
  controllers: [CommunityAlertsController],
  providers: [CommunityAlertsService],
})
export class CommunityAlertsModule {}
