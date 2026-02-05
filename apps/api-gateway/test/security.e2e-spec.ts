/* eslint-disable */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import {
  createRequest,
  postData,
  post,
  get,
  patch,
  del,
} from './test-request.helper';

describe('Security & Authorization E2E Tests (Sequential)', () => {
  let app: INestApplication;
  let req: any;
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
    await app.listen(0);
    req = createRequest(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should pass all security audit scenarios', async () => {
    // --- SETUP: Register two users ---

    const registerAResponse = await post(req, '/auth/register', {
      email: 'usera@security.test',
      name: 'User A',
      password: 'Password123!',
    }).expect(201);
    userAToken = registerAResponse.body.data.accessToken;

    // User B
    const registerBResponse = await post(req, '/auth/register', {
      email: 'userb@security.test',
      name: 'User B',
      password: 'Password123!',
    }).expect(201);
    userBToken = registerBResponse.body.data.accessToken;

    const workspacesAResponse = await get(req, '/workspaces')
      .set('Authorization', `Bearer ${userAToken}`)
      .expect(200);
    userAWorkspaceId = workspacesAResponse.body.data[0].id;

    const workspacesBResponse = await get(req, '/workspaces')
      .set('Authorization', `Bearer ${userBToken}`)
      .expect(200);
    userBWorkspaceId = workspacesBResponse.body.data[0].id;

    // --- 1. IDOR (Insecure Direct Object Reference) ---

    // User A tries to view User B's workspace
    await get(req, `/workspaces/${userBWorkspaceId}`)
      .set('Authorization', `Bearer ${userAToken}`)
      .expect(403); // Forbidden

    // User A tries to update User B's workspace
    await patch(req, `/workspaces/${userBWorkspaceId}`, {
      name: 'Tampered Name',
    })
      .set('Authorization', `Bearer ${userAToken}`)
      .expect(403); // Forbidden

    // User A tries to delete User B's workspace
    await del(req, `/workspaces/${userBWorkspaceId}`)
      .set('Authorization', `Bearer ${userAToken}`)
      .expect(403); // Forbidden

    // --- 2. Broken Access Control (Horizontal) ---

    // User A tries to list members of User B's workspace
    await get(req, `/workspaces/${userBWorkspaceId}/members`)
      .set('Authorization', `Bearer ${userAToken}`)
      .expect(403);

    // User A tries to add a member to User B's workspace
    await post(req, `/workspaces/${userBWorkspaceId}/members`, {
      email: 'attacker@evil.com',
      role: 'admin',
    })
      .set('Authorization', `Bearer ${userAToken}`)
      .expect(403);

    // --- 3. Broken Access Control (Vertical/Hierarchy) ---

    // Add User B to User A's workspace as READ-ONLY
    const addMemberResponse = await post(
      req,
      `/workspaces/${userAWorkspaceId}/members`,
      { email: 'userb@security.test', role: 'read' },
    )
      .set('Authorization', `Bearer ${userAToken}`)
      .expect(201);
    const userBMemberId = addMemberResponse.body.data.id;

    // User B (READ) tries to UPDATE workspace name (needs ADMIN)
    await patch(req, `/workspaces/${userAWorkspaceId}`, {
      name: 'User B Tamper',
    })
      .set('Authorization', `Bearer ${userBToken}`)
      .expect(403);

    // User B (READ) tries to ADD ANOTHER MEMBER (needs ADMIN)
    await post(req, `/workspaces/${userAWorkspaceId}/members`, {
      email: 'evil@evil.com',
      role: 'write',
    })
      .set('Authorization', `Bearer ${userBToken}`)
      .expect(403);

    // User B (READ) tries to PROMOTE THEMSELVES to ADMIN (Self-Promotion)
    await patch(
      req,
      `/workspaces/${userAWorkspaceId}/members/${userBMemberId}`,
      { role: 'admin' },
    )
      .set('Authorization', `Bearer ${userBToken}`)
      .expect(403);

    // --- 4. JWT Security ---

    // Expired or invalid token format
    await get(req, '/workspaces')
      .set('Authorization', 'Bearer invalid-token-string')
      .expect(401);

    // Missing token
    await get(req, '/workspaces').expect(401);

    // --- 5. Data Leakage ---

    // Check if passwords or hashes are leaked in User object (Member list)
    const membersResponse = await get(
      req,
      `/workspaces/${userAWorkspaceId}/members`,
    )
      .set('Authorization', `Bearer ${userAToken}`)
      .expect(200);

    expect(membersResponse.body.data[0]).not.toHaveProperty('password');
    expect(membersResponse.body.data[0]).not.toHaveProperty('passwordHash');
    expect(membersResponse.body.data[0]).not.toHaveProperty('hash');

    // --- 6. Input Validation / Injection ---

    // SQL Injection attempt in ID parameter (Kysely should handle this)
    await get(req, "/workspaces/' OR 1=1 --")
      .set('Authorization', `Bearer ${userAToken}`)
      .expect(400); // Should fail validation at controller level (UUID)

    // XSS attempt in Name
    await post(req, '/workspaces', {
      name: '<script>alert("xss")</script>',
      description: 'Testing XSS',
    })
      .set('Authorization', `Bearer ${userAToken}`)
      .expect(201);

    // We should ensure the output is properly escaped by frontend,
    // but backend should at least store it as provided OR strip tags if policy requires.
    // Here we just check it was created without crashing.
    // --- 7. Rate Limiting ---

    // Smoke test for rate limiting. sending 5 requests to ensure they pass.
    // Full 100/min test is too intensive for E2E environment.
    for (let i = 0; i < 5; i++) {
      await get(req, '/workspaces')
        .set('Authorization', `Bearer ${userAToken}`)
        .expect(200);
    }
  });
});
