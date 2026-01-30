import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { Request } from 'express';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy, 'api-key') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(req: Request): Promise<{ id: string; email: string }> {
    const apiKey = req.headers['x-api-key'] as string;

    if (!apiKey) {
      throw new UnauthorizedException('API key is missing');
    }

    const user = await this.authService.validateApiKey(apiKey);
    if (!user) {
      throw new UnauthorizedException('Invalid API key');
    }

    return user;
  }
}
