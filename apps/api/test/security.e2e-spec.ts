/* eslint-disable */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Security & Authorization E2E Tests (Sequential)', () => {
  let app: INestApplication;
  let userAToken: string;
  let userBToken: string;
  let userAWorkspaceId: string;
  let userBWorkspaceId: string;
  let userBId: string;

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

  it('should pass all security audit scenarios', async () => {
    // --- SETUP: Register two users ---

    // User A
    const registerAResponse = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'usera@security.test',
        name: 'User A',
        password: 'Password123!',
      })
      .expect(201);
    userAToken = registerAResponse.body.accessToken;

    // User B
    const registerBResponse = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'userb@security.test',
        name: 'User B',
        password: 'Password123!',
      })
      .expect(201);
    userBToken = registerBResponse.body.accessToken;

    // Get default workspaces
    const workspacesAResponse = await request(app.getHttpServer())
      .get('/workspaces')
      .set('Authorization', `Bearer ${userAToken}`)
      .expect(200);
    userAWorkspaceId = workspacesAResponse.body[0].id;

    const workspacesBResponse = await request(app.getHttpServer())
      .get('/workspaces')
      .set('Authorization', `Bearer ${userBToken}`)
      .expect(200);
    userBWorkspaceId = workspacesBResponse.body[0].id;

    // --- 1. IDOR (Insecure Direct Object Reference) ---

    // User A tries to view User B's workspace
    await request(app.getHttpServer())
      .get(`/workspaces/${userBWorkspaceId}`)
      .set('Authorization', `Bearer ${userAToken}`)
      .expect(403); // Forbidden

    // User A tries to update User B's workspace
    await request(app.getHttpServer())
      .patch(`/workspaces/${userBWorkspaceId}`)
      .set('Authorization', `Bearer ${userAToken}`)
      .send({ name: 'Tampered Name' })
      .expect(403); // Forbidden

    // User A tries to delete User B's workspace
    await request(app.getHttpServer())
      .delete(`/workspaces/${userBWorkspaceId}`)
      .set('Authorization', `Bearer ${userAToken}`)
      .expect(403); // Forbidden

    // --- 2. Broken Access Control (Horizontal) ---

    // User A tries to list members of User B's workspace
    await request(app.getHttpServer())
      .get(`/workspaces/${userBWorkspaceId}/members`)
      .set('Authorization', `Bearer ${userAToken}`)
      .expect(403);

    // User A tries to add a member to User B's workspace
    await request(app.getHttpServer())
      .post(`/workspaces/${userBWorkspaceId}/members`)
      .set('Authorization', `Bearer ${userAToken}`)
      .send({ email: 'attacker@evil.com', role: 'admin' })
      .expect(403);

    // --- 3. Broken Access Control (Vertical/Hierarchy) ---

    // Add User B to User A's workspace as READ-ONLY
    const addMemberResponse = await request(app.getHttpServer())
      .post(`/workspaces/${userAWorkspaceId}/members`)
      .set('Authorization', `Bearer ${userAToken}`)
      .send({ email: 'userb@security.test', role: 'read' })
      .expect(201);
    const userBMemberId = addMemberResponse.body.id;

    // User B (READ) tries to UPDATE workspace name (needs ADMIN)
    await request(app.getHttpServer())
      .patch(`/workspaces/${userAWorkspaceId}`)
      .set('Authorization', `Bearer ${userBToken}`)
      .send({ name: 'User B Tamper' })
      .expect(403);

    // User B (READ) tries to ADD ANOTHER MEMBER (needs ADMIN)
    await request(app.getHttpServer())
      .post(`/workspaces/${userAWorkspaceId}/members`)
      .set('Authorization', `Bearer ${userBToken}`)
      .send({ email: 'evil@evil.com', role: 'write' })
      .expect(403);

    // User B (READ) tries to PROMOTE THEMSELVES to ADMIN (Self-Promotion)
    await request(app.getHttpServer())
      .patch(`/workspaces/${userAWorkspaceId}/members/${userBMemberId}`)
      .set('Authorization', `Bearer ${userBToken}`)
      .send({ role: 'admin' })
      .expect(403);

    // --- 4. JWT Security ---

    // Expired or invalid token format
    await request(app.getHttpServer())
      .get('/workspaces')
      .set('Authorization', 'Bearer invalid-token-string')
      .expect(401);

    // Missing token
    await request(app.getHttpServer()).get('/workspaces').expect(401);

    // --- 5. Data Leakage ---

    // Check if passwords or hashes are leaked in User object (Member list)
    const membersResponse = await request(app.getHttpServer())
      .get(`/workspaces/${userAWorkspaceId}/members`)
      .set('Authorization', `Bearer ${userAToken}`)
      .expect(200);

    expect(membersResponse.body[0]).not.toHaveProperty('password');
    expect(membersResponse.body[0]).not.toHaveProperty('passwordHash');
    expect(membersResponse.body[0]).not.toHaveProperty('hash');

    // --- 6. Input Validation / Injection ---

    // SQL Injection attempt in ID parameter (Kysely should handle this)
    await request(app.getHttpServer())
      .get("/workspaces/' OR 1=1 --")
      .set('Authorization', `Bearer ${userAToken}`)
      .expect(400); // Should fail validation at controller level (UUID)

    // XSS attempt in Name
    const xssResponse = await request(app.getHttpServer())
      .post('/workspaces')
      .set('Authorization', `Bearer ${userAToken}`)
      .send({
        name: '<script>alert("xss")</script>',
        description: 'Testing XSS',
      })
      .expect(201);

    // We should ensure the output is properly escaped by frontend,
    // but backend should at least store it as provided OR strip tags if policy requires.
    // Here we just check it was created without crashing.
    // --- 7. Rate Limiting ---

    // Smoke test for rate limiting. sending 5 requests to ensure they pass.
    // Full 100/min test is too intensive for E2E environment.
    for (let i = 0; i < 5; i++) {
      await request(app.getHttpServer())
        .get('/workspaces')
        .set('Authorization', `Bearer ${userAToken}`)
        .expect(200);
    }
  });
});
