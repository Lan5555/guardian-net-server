import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateCommunityAlertDto } from 'src/community_alerts/dto/create-community_alert.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AlertGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinCommunity')
  handleJoinCommunity(
    @MessageBody() communityId: number,
    @ConnectedSocket() client: Socket,
  ) {
    void client.join(`community_${communityId}`);

    console.log(`Client ${client.id} joined community_${communityId}`);

    return {
      success: true,
      room: `community_${communityId}`,
    };
  }

  sendAlert(alert: CreateCommunityAlertDto) {
    this.server.to(`community_${alert.community_id}`).emit('new_alert', alert);
  }
}
