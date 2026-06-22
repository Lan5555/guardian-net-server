import { Module } from '@nestjs/common';
import { CommunityAlertsService } from './community_alerts.service';
import { CommunityAlertsController } from './community_alerts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityAlert } from './entities/community_alert.entity';
import { GatewayModule } from 'src/gateway/gateway.module';
import { Reputation } from 'src/reputation/entities/reputation.entity';
import { SmsModule } from 'src/sms/sms.module';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommunityAlert, Reputation, User]),
    GatewayModule,
    SmsModule,
  ],
  controllers: [CommunityAlertsController],
  providers: [CommunityAlertsService],
})
export class CommunityAlertsModule {}
