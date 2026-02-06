import { config } from '@apigateway/config';
import { UsersService } from '@backend/modules/users/services/users.service';
import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';


@WebSocketGateway({
  cors: {
    origin: config.cors.origins,
    credentials: true,
  },
  namespace: '/profile',
})
export class ProfileGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private logger = new Logger('ProfileGateway');
  private connectedClients = new Map<
    string,
    { userId: string; connectedAt: Date }
  >();

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token =
        client.handshake.auth.token ||
        client.handshake.headers.authorization?.split(' ')[1];

      if (!token) {
        this.logger.warn(`Client ${client.id} connected without token`);
        client.emit('error', { message: 'Authentication required' });
        client.disconnect();
        return;
      }

      const payload = this.jwtService.verify(token);
      const user = await this.usersService.findById(payload.sub);

      if (!user) {
        client.emit('error', { message: 'User not found' });
        client.disconnect();
        return;
      }

      client.data.userId = payload.sub;
      client.data.user = user;
      this.connectedClients.set(client.id, {
        userId: payload.sub,
        connectedAt: new Date(),
      });

      this.logger.log(`Client ${client.id} connected for user ${payload.sub}`);

      client.emit('connected', {
        status: 'ok',
        userId: payload.sub,
        message: 'Profile WebSocket connected',
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(
        `Connection error for client ${client.id}:`,
        errorMessage,
      );
      client.emit('error', { message: 'Invalid token' });
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const clientInfo = this.connectedClients.get(client.id);
    if (clientInfo) {
      this.logger.log(
        `Client ${client.id} disconnected (user: ${clientInfo.userId})`,
      );
      this.connectedClients.delete(client.id);
    }
  }

  @SubscribeMessage('getProfile')
  async handleGetProfile(@ConnectedSocket() client: Socket) {
    try {
      const userId = client.data.userId;
      const user = await this.usersService.findById(userId);

      if (!user) {
        client.emit('profile:error', { message: 'User not found' });
        return;
      }

      client.emit('profile:data', {
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          middle_name: user.middle_name,
          role: user.role,
          organization_id: user.organization_id,
        },
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error('Error getting profile:', errorMessage);
      client.emit('profile:error', { message: 'Failed to get profile' });
    }
  }

  @SubscribeMessage('updateProfile')
  async handleUpdateProfile(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: { first_name?: string; last_name?: string; middle_name?: string },
  ) {
    try {
      const userId = client.data.userId;
      const updatedUser = await this.usersService.updateProfile(userId, data);

      client.emit('profile:updated', {
        user: {
          id: updatedUser.id,
          email: updatedUser.email,
          first_name: updatedUser.first_name,
          last_name: updatedUser.last_name,
          middle_name: updatedUser.middle_name,
          role: updatedUser.role,
          organization_id: updatedUser.organization_id,
        },
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error('Error updating profile:', errorMessage);
      client.emit('profile:error', { message: 'Failed to update profile' });
    }
  }

  @SubscribeMessage('ping')
  handlePing(@ConnectedSocket() client: Socket) {
    client.emit('pong', { timestamp: Date.now() });
  }
}
