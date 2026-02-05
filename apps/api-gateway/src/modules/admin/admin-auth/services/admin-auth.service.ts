import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from '@database/database.service';

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly db: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.db.client
      .selectFrom('admin_users')
      .selectAll()
      .where('email', '=', email)
      .executeTakeFirst();

    if (!user) {
      throw new UnauthorizedException('Пользователь не найден');
    }

    if (!user.is_active) {
      throw new UnauthorizedException('Аккаунт заблокирован');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверный пароль');
    }

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role || 'user',
      permissions: [],
    };

    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role || 'user',
      },
    };
  }

  async validateToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('Недействительный токен');
    }
  }
}
