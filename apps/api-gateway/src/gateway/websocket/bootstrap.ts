import { config } from '@config';
import { UsersService } from '@modules/users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { ProfileGateway } from './profile.gateway';

export function bootstrapWebsocket(
  jwtService: JwtService,
  usersService: UsersService,
): void {
  const httpServer = createServer();
  const wsServer = new Server(httpServer, {
    cors: {
      origin: config.cors.origins,
      credentials: true,
    },
  });

  const profileGateway = new ProfileGateway(jwtService, usersService);
  const profileNamespace = wsServer.of('/profile');

  profileNamespace.on('connection', (socket) => {
    profileGateway.handleConnection(socket);
    socket.on('disconnect', () => profileGateway.handleDisconnect(socket));
    socket.on('getProfile', () => profileGateway.handleGetProfile(socket));
    socket.on('updateProfile', (data) =>
      profileGateway.handleUpdateProfile(socket, data),
    );
    socket.on('ping', () => profileGateway.handlePing(socket));
  });

  httpServer.listen(config.ws.port, () => {
    console.log(
      `🔌 WebSocket server running on ws://localhost:${config.ws.port}/profile`,
    );
  });
}
