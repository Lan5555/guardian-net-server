import { Controller } from '@nestjs/common';
import { SocketHandlerService } from './socket_handler.service';

@Controller('socket-handler')
export class SocketHandlerController {
  constructor(private readonly socketHandlerService: SocketHandlerService) {}
}
