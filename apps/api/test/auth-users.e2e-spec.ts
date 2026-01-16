import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Auth & Users E2E Tests (Sequential)', () => {
  let app: INestApplication;
  let authToken: string;
  let refreshToken: string;
  let userId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  // All tests run sequentially in one suite
  it('should complete full auth and users flow', async () => {
    // 1. Test registration validation - invalid email
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'invalid-email',
        name: 'Test User',
        password: 'password123',
      })
      .expect(400);

    // 2. Test registration validation - short password
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'test2@example.com',
        name: 'Test User',
        password: '12345',
      })
      .expect(400);

    // 3. Register main test user
    const registerResponse = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'main-test@example.com',
        name: 'Test User',
        password: 'password123',
      })
      .expect(201);

    expect(registerResponse.body).toHaveProperty('accessToken');
    expect(registerResponse.body).toHaveProperty('refreshToken');
    expect(registerResponse.body).toHaveProperty('expiresIn');

    authToken = registerResponse.body.accessToken;
    refreshToken = registerResponse.body.refreshToken;

    // 4. Test duplicate email registration
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'main-test@example.com',
        name: 'Test User 2',
        password: 'password123',
      })
      .expect(409);

    // 5. Test login with wrong password
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'main-test@example.com',
        password: 'wrongpassword',
      })
      .expect(401);

    // 6. Test login with non-existent email
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'password123',
      })
      .expect(401);

    // 7. Login with valid credentials
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'main-test@example.com',
        password: 'password123',
      })
      .expect(200);

    expect(loginResponse.body).toHaveProperty('accessToken');
    expect(loginResponse.body).toHaveProperty('refreshToken');

    authToken = loginResponse.body.accessToken;
    refreshToken = loginResponse.body.refreshToken;

    // 8. Test refresh token with invalid token
    await request(app.getHttpServer())
      .post('/auth/refresh')
      .send({
        refreshToken: 'invalid-token',
      })
      .expect(401);

    // 9. Refresh access token with valid token
    const refreshResponse = await request(app.getHttpServer())
      .post('/auth/refresh')
      .send({
        refreshToken: refreshToken,
      })
      .expect(200);

    expect(refreshResponse.body).toHaveProperty('accessToken');
    expect(refreshResponse.body).toHaveProperty('refreshToken');

    authToken = refreshResponse.body.accessToken;

    // 10. Get current user profile without token
    await request(app.getHttpServer()).get('/users/me').expect(401);

    // 11. Get current user profile with invalid token
    await request(app.getHttpServer())
      .get('/users/me')
      .set('Authorization', 'Bearer invalid-token')
      .expect(401);

    // 12. Get current user profile with valid token
    const profileResponse = await request(app.getHttpServer())
      .get('/users/me')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(profileResponse.body).toHaveProperty('id');
    expect(profileResponse.body).toHaveProperty('email', 'main-test@example.com');
    expect(profileResponse.body).toHaveProperty('name', 'Test User');
    expect(profileResponse.body).not.toHaveProperty('password');

    userId = profileResponse.body.id;

    // 13. Get user by id
    const userByIdResponse = await request(app.getHttpServer())
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(userByIdResponse.body).toHaveProperty('id', userId);
    expect(userByIdResponse.body).toHaveProperty('email', 'main-test@example.com');
    expect(userByIdResponse.body).not.toHaveProperty('password');

    // 14. Get user with non-existent id
    await request(app.getHttpServer())
      .get('/users/00000000-0000-0000-0000-000000000000')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(404);

    // 15. Create API key without token
    await request(app.getHttpServer())
      .post('/users/api-keys')
      .send({
        name: 'Test API Key',
        permissions: ['read:workspaces'],
      })
      .expect(401);

    // 16. Create API key with valid token
    const apiKeyResponse = await request(app.getHttpServer())
      .post('/users/api-keys')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'Test API Key',
        permissions: ['read:workspaces', 'write:tables'],
      })
      .expect(201);

    expect(apiKeyResponse.body).toHaveProperty('apiKey');
    expect(apiKeyResponse.body).toHaveProperty('name', 'Test API Key');
    expect(apiKeyResponse.body.apiKey).toMatch(/^elk_/);
  });
});
