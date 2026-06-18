import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GatewayController } from './gateway.controller';
import { AlertGateway } from './gateway';

@Module({
  controllers: [GatewayController],
  providers: [GatewayService, AlertGateway],
  exports: [GatewayService, AlertGateway],
})
export class GatewayModule {}
