/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { CommunityModule } from './community/community.module';
import { CommunityAlertsModule } from './community_alerts/community_alerts.module';
import { ReputationModule } from './reputation/reputation.module';
import { SmsModule } from './sms/sms.module';
import { SocketHandlerModule } from './socket_handler/socket_handler.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: false,
    }),
    UsersModule,
    CommunityModule,
    CommunityAlertsModule,
    ReputationModule,
    SmsModule,
    SocketHandlerModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
