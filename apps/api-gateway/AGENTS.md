# AGENTS.md - API Zone

## Documentation

→ @docs/ → @docs/
→ PROJECT_TREE.md → @apps/api/docs/PROJECT_TREE.md

## Commands

```bash
cd apps/api
pnpm dev                  # NestJS dev mode (port 7100)
pnpm build                # Production build
pnpm test                 # Run all tests
pnpm test:watch          # Watch mode
pnpm test:e2e            # End-to-end tests
pnpm lint                # Run ESLint
pnpm lint:fix            # Fix ESLint issues
pnpm type-check          # TypeScript check
```

## Architecture

```
apps/api/src/modules/{feature}/
├── controllers/          # REST endpoints
├── services/            # Business logic
├── dto/                 # Data transfer objects
├── entities/            # TypeORM entities
├── interfaces/          # TypeScript interfaces
├── events/              # Event emitters
├── guards/              # Auth guards
├── strategies/          # Passport strategies
└── {feature}.module.ts # NestJS module
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
