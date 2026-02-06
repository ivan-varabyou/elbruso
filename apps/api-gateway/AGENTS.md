# AGENTS.md - API Gateway Zone

## Documentation

→ @docs/ → @docs/
→ PROJECT_TREE.md → @docs/PROJECT_TREE.md

## Commands

```bash
cd apps/api-gateway
pnpm dev                  # NestJS dev mode (port 7100)
pnpm build                # Production build
pnpm test                 # Run all tests
pnpm test:watch          # Watch mode
pnpm test:e2e            # End-to-end tests
pnpm lint                # Run ESLint
pnpm lint:fix            # Fix ESLint issues
pnpm type-check          # TypeScript check
```

## Architecture: Monolith with Microservices-Ready Structure

### Philosophy

Modules are developed in `@backend` package - ready for microservice extraction.
Currently runs as monolith for simplicity, but structured for easy separation.

```
@backend/                          # Development happens HERE
└── packages/backend/src/
    ├── modules/                  # Feature modules (auth, users, etc.)
    │   ├── auth/
    │   ├── users/
    │   ├── workspace/
    │   └── .../
    └── shared/                   # Shared utilities (decorators, dto, interfaces)

apps/api-gateway/                  # Entry point - thin layer
└── src/
    ├── core/                     # Gateway-specific logic
    │   ├── controllers/         # REST controllers
    │   ├── services/            # Gateway services
    │   ├── guards/              # Gateway guards
    │   ├── filters/             # Exception filters
    │   ├── interceptors/        # Request interceptors
    │   └── websocket/           # WebSocket handlers
    ├── gateway/                 # Gateway modules
    └── config/                  # Configuration
```

### Why This Structure?

1. **Develop in `@backend`** - modules are independent
2. **Import via `@backend/*`** - clean dependencies
3. **Extract to microservice** - just copy module, change entry point
4. **Keep monolithic for now** - easier development, same code quality

## Module Structure (in @backend)

```
@backend/modules/{feature}/
├── controllers/          # REST endpoints
├── services/             # Business logic
├── dto/                  # Data transfer objects
├── entities/             # Database entities
├── interfaces/           # TypeScript interfaces
├── events/               # Event emitters
├── guards/               # Auth guards
├── strategies/           # Passport strategies
├── decorators/           # Custom decorators
└── {feature}.module.ts  # NestJS module
```

## Import from Backend Package

```typescript
// Use backend modules from @backend/*
import { AuthModule } from '@backend/modules/auth/auth.module';
import { UsersService } from '@backend/modules/users/services/users.service';
import { RolesGuard } from '@backend/modules/admin/guards/roles.guard';

// Use database from @database
import { DatabaseModule } from '@database/database.module';
import { DatabaseService } from '@database/database.service';

// Use gateway-specific code
import { GatewayModule } from './gateway/gateway.module';
import { AuthGuard } from './core/guards/auth.guard';
```

## NestJS Patterns

### Controller

```typescript
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
```

### Service

```typescript
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      return user;
    }
    return null;
  }
}
```

### DTO with Validation

```typescript
export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
```

## Database (Kysely)

```typescript
import { DatabaseService } from '@database/database.service';

// Query example
const activeUsers = await db
  .selectFrom('users')
  .where('status', '=', 'active')
  .select(['id', 'email', 'name'])
  .execute();

// Insert with returning
const [user] = await db
  .insertInto('users')
  .values({ email, password: hash, name })
  .returningAll()
  .execute();
```

## Auth Patterns

```typescript
// JWT Strategy
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: config.get('JWT_SECRET') });
  }

  async validate(payload: JwtPayload) {
    return { userId: payload.sub, email: payload.email };
  }
}

// Guard usage
@UseGuards(JwtAuthGuard)
@Get('profile')
async getProfile(@CurrentUser() user: User) {
  return user;
}
```

## ESLint Rules

- `no-barrel-exports` - No `export *` in index files
- Named exports only in modules
- `import-aliases` - Use `@backend/*`, `@database/*`, `@apigateway/*` aliases
