import { Module } from '@nestjs/common';
import { SocketHandlerService } from './socket_handler.service';
import { SocketHandlerController } from './socket_handler.controller';

@Module({
  controllers: [SocketHandlerController],
  providers: [SocketHandlerService],
})
export class SocketHandlerModule {}
