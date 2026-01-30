export interface JwtPayload {
  sub: string;
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
