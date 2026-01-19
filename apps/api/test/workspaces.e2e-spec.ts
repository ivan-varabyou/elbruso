/* eslint-disable */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Workspaces E2E Tests (Sequential)', () => {
  let app: INestApplication;
  let ownerToken: string;
  let memberToken: string;
  let workspaceId: string;
  let memberId: string;
  let defaultWorkspaceId: string;

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

  it('should complete full workspaces lifecycle', async () => {
    // 1. Register owner user
    const ownerResponse = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'owner@example.com',
        name: 'Workspace Owner',
        password: 'password123',
      })
      .expect(201);

    ownerToken = ownerResponse.body.accessToken;
    expect(ownerToken).toBeDefined();

    // 2. Register member user
    const memberResponse = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'member@example.com',
        name: 'Team Member',
        password: 'password123',
      })
      .expect(201);

    memberToken = memberResponse.body.accessToken;
    expect(memberToken).toBeDefined();

    // 3. Get owner's workspaces (should have default workspace)
    const workspacesResponse = await request(app.getHttpServer())
      .get('/workspaces')
      .set('Authorization', `Bearer ${ownerToken}`)
      .expect(200);

    expect(workspacesResponse.body).toBeInstanceOf(Array);
    expect(workspacesResponse.body.length).toBeGreaterThan(0);
    defaultWorkspaceId = workspacesResponse.body[0].id;
    expect(workspacesResponse.body[0].name).toBe("Workspace Owner's Workspace");
    expect(workspacesResponse.body[0].userRole).toBe('owner');

    // 4. Create new workspace
    const createResponse = await request(app.getHttpServer())
      .post('/workspaces')
      .set('Authorization', `Bearer ${ownerToken}`)
      .send({
        name: 'Test Workspace',
        description: 'A test workspace',
        icon: '🚀',
      })
      .expect(201);

    workspaceId = createResponse.body.id;
    expect(createResponse.body.name).toBe('Test Workspace');
    expect(createResponse.body.slug).toBe('test-workspace');
    expect(createResponse.body.description).toBe('A test workspace');
    expect(createResponse.body.icon).toBe('🚀');
    expect(createResponse.body.userRole).toBe('owner');

    // 5. Create workspace with invalid data (empty name)
    await request(app.getHttpServer())
      .post('/workspaces')
      .set('Authorization', `Bearer ${ownerToken}`)
      .send({
        name: '',
        description: 'Invalid workspace',
      })
      .expect(400);

    // 6. Create workspace without auth
    await request(app.getHttpServer())
      .post('/workspaces')
      .send({
        name: 'Unauthorized Workspace',
      })
      .expect(401);

    // 7. Get workspace by ID
    const getResponse = await request(app.getHttpServer())
      .get(`/workspaces/${workspaceId}`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .expect(200);

    expect(getResponse.body.id).toBe(workspaceId);
    expect(getResponse.body.name).toBe('Test Workspace');
    expect(getResponse.body.userRole).toBe('owner');

    // 8. Get non-existent workspace
    await request(app.getHttpServer())
      .get('/workspaces/00000000-0000-0000-0000-000000000000')
      .set('Authorization', `Bearer ${ownerToken}`)
      .expect(403);

    // 9. Update workspace
    const updateResponse = await request(app.getHttpServer())
      .patch(`/workspaces/${workspaceId}`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .send({
        name: 'Updated Workspace',
        description: 'Updated description',
      })
      .expect(200);

    expect(updateResponse.body.name).toBe('Updated Workspace');
    expect(updateResponse.body.slug).toBe('updated-workspace');
    expect(updateResponse.body.description).toBe('Updated description');

    // 10. Update workspace without permission (member not added yet)
    await request(app.getHttpServer())
      .patch(`/workspaces/${workspaceId}`)
      .set('Authorization', `Bearer ${memberToken}`)
      .send({
        name: 'Unauthorized Update',
      })
      .expect(403);

    // 11. Add member to workspace
    const addMemberResponse = await request(app.getHttpServer())
      .post(`/workspaces/${workspaceId}/members`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .send({
        email: 'member@example.com',
        role: 'write',
      })
      .expect(201);

    memberId = addMemberResponse.body.id;
    expect(addMemberResponse.body.email).toBe('member@example.com');
    expect(addMemberResponse.body.role).toBe('write');

    // 12. Add member without permission
    await request(app.getHttpServer())
      .post(`/workspaces/${workspaceId}/members`)
      .set('Authorization', `Bearer ${memberToken}`)
      .send({
        email: 'another@example.com',
        role: 'read',
      })
      .expect(403);

    // 13. Add duplicate member
    await request(app.getHttpServer())
      .post(`/workspaces/${workspaceId}/members`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .send({
        email: 'member@example.com',
        role: 'admin',
      })
      .expect(409);

    // 14. Add non-existent user
    await request(app.getHttpServer())
      .post(`/workspaces/${workspaceId}/members`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .send({
        email: 'nonexistent@example.com',
        role: 'read',
      })
      .expect(404);

    // 15. Get workspace members
    const membersResponse = await request(app.getHttpServer())
      .get(`/workspaces/${workspaceId}/members`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .expect(200);

    expect(membersResponse.body).toBeInstanceOf(Array);
    expect(membersResponse.body.length).toBe(2); // owner + member
    const ownerMember = membersResponse.body.find(
      (m: { email: string }) => m.email === 'owner@example.com',
    );
    const teamMember = membersResponse.body.find(
      (m: { email: string }) => m.email === 'member@example.com',
    );
    expect(ownerMember.role).toBe('owner');
    expect(teamMember.role).toBe('write');

    // 16. Member can now access workspace
    const memberAccessResponse = await request(app.getHttpServer())
      .get(`/workspaces/${workspaceId}`)
      .set('Authorization', `Bearer ${memberToken}`)
      .expect(200);

    expect(memberAccessResponse.body.id).toBe(workspaceId);
    expect(memberAccessResponse.body.userRole).toBe('write');

    // 17. Member cannot update workspace (write role, needs admin)
    await request(app.getHttpServer())
      .patch(`/workspaces/${workspaceId}`)
      .set('Authorization', `Bearer ${memberToken}`)
      .send({
        name: 'Member Update Attempt',
      })
      .expect(403);

    // 18. Member cannot update member roles (write role, needs admin)
    await request(app.getHttpServer())
      .patch(`/workspaces/${workspaceId}/members/${memberId}`)
      .set('Authorization', `Bearer ${memberToken}`)
      .send({
        role: 'read',
      })
      .expect(403);

    // 19. Update member role to admin
    await request(app.getHttpServer())
      .patch(`/workspaces/${workspaceId}/members/${memberId}`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .send({
        role: 'admin',
      })
      .expect(200);

    // 20. Admin can now update workspace
    await request(app.getHttpServer())
      .patch(`/workspaces/${workspaceId}`)
      .set('Authorization', `Bearer ${memberToken}`)
      .send({
        name: 'Admin Updated Workspace',
      })
      .expect(200);

    // 21. Admin can now update other members roles (needs admin)
    // First, let's create a third user to have someone to update
    const user3Response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'user3@example.com',
        name: 'User 3',
        password: 'password123',
      })
      .expect(201);

    // Add user3 as member
    const addMember3Response = await request(app.getHttpServer())
      .post(`/workspaces/${workspaceId}/members`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .send({
        email: 'user3@example.com',
        role: 'read',
      })
      .expect(201);
    const member3Id = addMember3Response.body.id;

    // Admin (memberToken) updates user3 role
    await request(app.getHttpServer())
      .patch(`/workspaces/${workspaceId}/members/${member3Id}`)
      .set('Authorization', `Bearer ${memberToken}`)
      .send({
        role: 'write',
      })
      .expect(200);

    // 21. Cannot assign owner role
    await request(app.getHttpServer())
      .post(`/workspaces/${workspaceId}/members`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .send({
        email: 'another@example.com',
        role: 'owner',
      })
      .expect(400);

    // 22. Remove member
    await request(app.getHttpServer())
      .delete(`/workspaces/${workspaceId}/members/${memberId}`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .expect(200);

    // 23. Member can no longer access workspace
    await request(app.getHttpServer())
      .get(`/workspaces/${workspaceId}`)
      .set('Authorization', `Bearer ${memberToken}`)
      .expect(403);

    // 24. Remove member without permission
    await request(app.getHttpServer())
      .delete(`/workspaces/${workspaceId}/members/${memberId}`)
      .set('Authorization', `Bearer ${memberToken}`)
      .expect(403);

    // 25. Delete workspace without permission
    await request(app.getHttpServer())
      .delete(`/workspaces/${workspaceId}`)
      .set('Authorization', `Bearer ${memberToken}`)
      .expect(403);

    // 26. Delete workspace (owner only)
    await request(app.getHttpServer())
      .delete(`/workspaces/${workspaceId}`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .expect(200);

    // 27. Deleted workspace not in list
    const finalListResponse = await request(app.getHttpServer())
      .get('/workspaces')
      .set('Authorization', `Bearer ${ownerToken}`)
      .expect(200);

    const deletedWorkspace = finalListResponse.body.find(
      (w: { id: string }) => w.id === workspaceId,
    );
    expect(deletedWorkspace).toBeUndefined();

    // 28. Cannot access deleted workspace
    await request(app.getHttpServer())
      .get(`/workspaces/${workspaceId}`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .expect(404);
  });
});
