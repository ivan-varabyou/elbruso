import { io, Socket } from "socket.io-client";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "http://localhost:7000";

export interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  role?: string;
  organization_id?: number | null;
}

interface ConnectedData {
  status: string;
  userId: string;
}

interface ErrorData {
  message: string;
}

interface ProfileData {
  user: User;
}

interface PongData {
  timestamp: number;
}

interface ClientProfileEvents {
  connected: (data: ConnectedData) => void;
  error: (data: ErrorData) => void;
  "profile:data": (data: ProfileData) => void;
  "profile:updated": (data: ProfileData) => void;
  "profile:error": (data: ErrorData) => void;
  pong: (data: PongData) => void;
}

interface ServerProfileEvents {
  getProfile: () => void;
  updateProfile: (data: { first_name?: string; last_name?: string; middle_name?: string }) => void;
  ping: () => void;
}

type ProfileSocket = Socket<ClientProfileEvents, ServerProfileEvents>;

let socket: ProfileSocket | null = null;

export function getProfileSocket(token: string): ProfileSocket {
  if (socket?.connected) {
    return socket;
  }

  socket = io(`${WS_URL}/profile`, {
    auth: { token },
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  socket.on("connect", () => {
    console.log("Profile WebSocket connected");
  });

  socket.on("disconnect", (reason: string) => {
    console.log("Profile WebSocket disconnected:", reason);
  });

  socket.on("connect_error", (error: Error) => {
    console.error("Profile WebSocket connection error:", error.message);
  });

  return socket;
}

export function disconnectProfileSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

export function getProfile(token: string): Promise<ProfileData> {
  return new Promise((resolve, reject) => {
    const ws = getProfileSocket(token);

    const handleConnected = () => {
      ws.emit("getProfile");
      ws.off("connected", handleConnected);
    };

    if (!ws.connected) {
      ws.on("connected", handleConnected);
    } else {
      ws.emit("getProfile");
    }

    const timeout = setTimeout(() => {
      reject(new Error("Profile request timeout"));
    }, 10000);

    ws.once("profile:data", (data: ProfileData) => {
      clearTimeout(timeout);
      resolve(data);
    });

    ws.once("profile:error", (error: ErrorData) => {
      clearTimeout(timeout);
      reject(new Error(error.message));
    });
  });
}

export function updateProfile(
  token: string,
  data: { first_name?: string; last_name?: string; middle_name?: string },
): Promise<ProfileData> {
  return new Promise((resolve, reject) => {
    const ws = getProfileSocket(token);

    const handleConnected = () => {
      ws.emit("updateProfile", data);
      ws.off("connected", handleConnected);
    };

    if (!ws.connected) {
      ws.on("connected", handleConnected);
    } else {
      ws.emit("updateProfile", data);
    }

    const timeout = setTimeout(() => {
      reject(new Error("Profile update timeout"));
    }, 10000);

    ws.once("profile:updated", (response: ProfileData) => {
      clearTimeout(timeout);
      resolve(response);
    });

    ws.once("profile:error", (error: ErrorData) => {
      clearTimeout(timeout);
      reject(new Error(error.message));
    });
  });
}

export function pingProfile(): Promise<number> {
  return new Promise((resolve) => {
    if (!socket?.connected) {
      resolve(-1);
      return;
    }

    const start = Date.now();
    socket.emit("ping");

    socket.once("pong", () => {
      resolve(Date.now() - start);
    });

    setTimeout(() => resolve(-1), 5000);
  });
}
