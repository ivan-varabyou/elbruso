import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../src/app.module';
import { createRequest, get,post, postData } from './test-request.helper';

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
    await app.listen(0); // Start server on random port for E2E tests
  });

  afterAll(async () => {
    await app.close();
  });

  // All tests run sequentially in one suite
  it('should complete full auth and users flow', async () => {
    const req = createRequest(app);

    // 1. Test registration validation - invalid email
    await post(req, '/auth/register', {
      email: 'invalid-email',
      name: 'Test User',
      password: 'password123',
    }).expect(400);

    // 2. Test registration validation - short password
    await post(req, '/auth/register', {
      email: 'test2@example.com',
      name: 'Test User',
      password: '12345',
    }).expect(400);

    // 3. Register main test user
    const registerData = await postData(req, '/auth/register', {
      email: 'main-test@example.com',
      name: 'Test User',
      password: 'password123',
    });

    expect(registerData).toHaveProperty('accessToken');
    expect(registerData).toHaveProperty('refreshToken');
    expect(registerData).toHaveProperty('expiresIn');

    authToken = registerData.accessToken;
    refreshToken = registerData.refreshToken;

    // 4. Test duplicate email registration
    await post(req, '/auth/register', {
      email: 'main-test@example.com',
      name: 'Test User 2',
      password: 'password123',
    }).expect(409);

    // 5. Test login with wrong password
    await post(req, '/auth/login', {
      email: 'main-test@example.com',
      password: 'wrongpassword',
    }).expect(401);

    // 6. Test login with non-existent email
    await post(req, '/auth/login', {
      email: 'nonexistent@example.com',
      password: 'password123',
    }).expect(401);

    // 7. Login with valid credentials
    const loginData = await postData(req, '/auth/login', {
      email: 'main-test@example.com',
      password: 'password123',
    });

    expect(loginData).toHaveProperty('accessToken');
    expect(loginData).toHaveProperty('refreshToken');

    authToken = loginData.accessToken;
    refreshToken = loginData.refreshToken;

    // 8. Test refresh token with invalid token
    await post(req, '/auth/refresh', {
      refreshToken: 'invalid-token',
    }).expect(401);

    // 9. Refresh access token with valid token
    const refreshData = await postData(req, '/auth/refresh', {
      refreshToken: refreshToken,
    });

    expect(refreshData).toHaveProperty('accessToken');
    expect(refreshData).toHaveProperty('refreshToken');

    authToken = refreshData.accessToken;

    // 10. Get current user profile without token
    await get(req, '/users/me').expect(401);

    // 11. Get current user profile with invalid token
    await get(req, '/users/me')
      .set('Authorization', 'Bearer invalid-token')
      .expect(401);

    // 12. Get current user profile with valid token
    const profileResponse = await get(req, '/users/me')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(profileResponse.body.data).toHaveProperty('id');
    expect(profileResponse.body.data).toHaveProperty(
      'email',
      'main-test@example.com',
    );
    expect(profileResponse.body.data).toHaveProperty('name', 'Test User');
    expect(profileResponse.body.data).not.toHaveProperty('password');

    userId = profileResponse.body.data.id;

    // 13. Get user by id
    const userByIdResponse = await get(req, `/users/${userId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(userByIdResponse.body.data).toHaveProperty('id', userId);
    expect(userByIdResponse.body.data).toHaveProperty(
      'email',
      'main-test@example.com',
    );
    expect(userByIdResponse.body.data).not.toHaveProperty('password');

    // 14. Get user with non-existent id
    await get(req, '/users/00000000-0000-0000-0000-000000000000')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(404);

    // 15. Create API key without token
    await post(req, '/users/api-keys', {
      name: 'Test API Key',
      permissions: ['read:workspaces'],
    }).expect(401);

    // 16. Create API key with valid token
    const apiKeyResponse = await post(req, '/users/api-keys')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'Test API Key',
        permissions: ['read:workspaces', 'write:tables'],
      })
      .expect(201);

    expect(apiKeyResponse.body.data).toHaveProperty('apiKey');
    expect(apiKeyResponse.body.data).toHaveProperty('name', 'Test API Key');
    expect(apiKeyResponse.body.data.apiKey).toMatch(/^elk_/);
  });
});
