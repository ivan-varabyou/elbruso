export interface JwtPayload {
  sub: string; // user ID
  email: string;
  iat?: number;
  exp?: number;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

export interface RequestWithUser extends Request {
  user: JwtPayload;
}
