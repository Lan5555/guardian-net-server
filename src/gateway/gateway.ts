/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
import { CommunityAlert } from 'src/community_alerts/entities/community_alert.entity';

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

  sendAlert(alert: CommunityAlert) {
    this.server.to(`community_${alert.community_id}`).emit('new_alert', alert);
  }
  removeAlert(alert: CommunityAlert) {
    const community = alert.community_id as any;
    this.server
      .to(`community_${community.id as number}`)
      .emit('remove_alert', { ...alert, community_id: community.id });
  }
}
