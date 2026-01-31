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

describe('Workspaces E2E Tests (Sequential)', () => {
  let app: INestApplication;
  let req: any;
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
    await app.listen(0);
    req = createRequest(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should complete full workspaces lifecycle', async () => {
    // 1. Register owner user
    const ownerResponse = await post(req, '/auth/register', {
      email: 'owner@example.com',
      name: 'Workspace Owner',
      password: 'password123',
    }).expect(201);

    ownerToken = ownerResponse.body.data.accessToken;
    expect(ownerToken).toBeDefined();

    // 2. Register member user
    const memberResponse = await post(req, '/auth/register', {
      email: 'member@example.com',
      name: 'Team Member',
      password: 'password123',
    }).expect(201);

    memberToken = memberResponse.body.data.accessToken;
    expect(memberToken).toBeDefined();

    // 3. Get owner's workspaces (should have default workspace)
    const workspacesResponse = await get(req, '/workspaces')
      .set('Authorization', `Bearer ${ownerToken}`)
      .expect(200);

    expect(workspacesResponse.body.data).toBeInstanceOf(Array);
    expect(workspacesResponse.body.data.length).toBeGreaterThan(0);
    defaultWorkspaceId = workspacesResponse.body.data[0].id;
    expect(workspacesResponse.body.data[0].name).toBe(
      "Workspace Owner's Workspace",
    );
    expect(workspacesResponse.body.data[0].userRole).toBe('owner');

    // 4. Create new workspace
    const createResponse = await post(req, '/workspaces', {
      name: 'Test Workspace',
      description: 'A test workspace',
      icon: '🚀',
    })
      .set('Authorization', `Bearer ${ownerToken}`)
      .expect(201);

    workspaceId = createResponse.body.data.id;
    expect(createResponse.body.data.name).toBe('Test Workspace');
    expect(createResponse.body.data.slug).toBe('test-workspace');
    expect(createResponse.body.data.description).toBe('A test workspace');
    expect(createResponse.body.data.icon).toBe('🚀');
    expect(createResponse.body.data.userRole).toBe('owner');

    // 5. Create workspace with invalid data (empty name)
    await post(req, '/workspaces', {
      name: '',
      description: 'Invalid workspace',
    })
      .set('Authorization', `Bearer ${ownerToken}`)
      .expect(400);

    // 6. Create workspace without auth
    await post(req, '/workspaces', {
      name: 'Unauthorized Workspace',
    }).expect(401);

    // 7. Get workspace by ID
    const getResponse = await get(req, `/workspaces/${workspaceId}`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .expect(200);

    expect(getResponse.body.data.id).toBe(workspaceId);
    expect(getResponse.body.data.name).toBe('Test Workspace');
    expect(getResponse.body.data.userRole).toBe('owner');

    // 8. Get non-existent workspace
    await get(req, '/workspaces/00000000-0000-0000-0000-000000000000')
      .set('Authorization', `Bearer ${ownerToken}`)
      .expect(403);

    // 9. Update workspace
    const updateResponse = await patch(req, `/workspaces/${workspaceId}`, {
      name: 'Updated Workspace',
      description: 'Updated description',
    })
      .set('Authorization', `Bearer ${ownerToken}`)
      .expect(200);

    expect(updateResponse.body.data.name).toBe('Updated Workspace');
    expect(updateResponse.body.data.slug).toBe('updated-workspace');
    expect(updateResponse.body.data.description).toBe('Updated description');

    // 10. Update workspace without permission (member not added yet)
    await patch(req, `/workspaces/${workspaceId}`, {
      name: 'Unauthorized Update',
    })
      .set('Authorization', `Bearer ${memberToken}`)
      .expect(403);

    // 11. Add member to workspace
    const addMemberResponse = await post(
      req,
      `/workspaces/${workspaceId}/members`,
      {
        email: 'member@example.com',
        role: 'write',
      },
    )
      .set('Authorization', `Bearer ${ownerToken}`)
      .expect(201);

    memberId = addMemberResponse.body.data.id;
    expect(addMemberResponse.body.data.email).toBe('member@example.com');
    expect(addMemberResponse.body.data.role).toBe('write');

    // 12. Add member without permission
    await post(req, `/workspaces/${workspaceId}/members`, {
      email: 'another@example.com',
      role: 'read',
    })
      .set('Authorization', `Bearer ${memberToken}`)
      .expect(403);

    // 13. Add duplicate member
    await post(req, `/workspaces/${workspaceId}/members`, {
      email: 'member@example.com',
      role: 'admin',
    })
      .set('Authorization', `Bearer ${ownerToken}`)
      .expect(409);

    // 14. Add non-existent user
    await post(req, `/workspaces/${workspaceId}/members`, {
      email: 'nonexistent@example.com',
      role: 'read',
    })
      .set('Authorization', `Bearer ${ownerToken}`)
      .expect(404);

    // 15. Get workspace members
    const membersResponse = await get(req, `/workspaces/${workspaceId}/members`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .expect(200);

    expect(membersResponse.body.data).toBeInstanceOf(Array);
    expect(membersResponse.body.data.length).toBe(2); // owner + member
    const ownerMember = membersResponse.body.data.find(
      (m: { email: string }) => m.email === 'owner@example.com',
    );
    const teamMember = membersResponse.body.data.find(
      (m: { email: string }) => m.email === 'member@example.com',
    );
    expect(ownerMember.role).toBe('owner');
    expect(teamMember.role).toBe('write');

    // 16. Member can now access workspace
    const memberAccessResponse = await get(req, `/workspaces/${workspaceId}`)
      .set('Authorization', `Bearer ${memberToken}`)
      .expect(200);

    expect(memberAccessResponse.body.data.id).toBe(workspaceId);
    expect(memberAccessResponse.body.data.userRole).toBe('write');

    // 17. Member cannot update workspace (write role, needs admin)
    await patch(req, `/workspaces/${workspaceId}`, {
      name: 'Member Update Attempt',
    })
      .set('Authorization', `Bearer ${memberToken}`)
      .expect(403);

    // 18. Member cannot update member roles (write role, needs admin)
    await patch(req, `/workspaces/${workspaceId}/members/${memberId}`, {
      role: 'read',
    })
      .set('Authorization', `Bearer ${memberToken}`)
      .expect(403);

    // 19. Update member role to admin
    await patch(req, `/workspaces/${workspaceId}/members/${memberId}`, {
      role: 'admin',
    })
      .set('Authorization', `Bearer ${ownerToken}`)
      .expect(200);

    // 20. Admin can now update workspace
    await patch(req, `/workspaces/${workspaceId}`, {
      name: 'Admin Updated Workspace',
    })
      .set('Authorization', `Bearer ${memberToken}`)
      .expect(200);

    // 21. Admin can now update other members roles (needs admin)
    // First, let's create a third user to have someone to update
    const user3Response = await post(req, '/auth/register', {
      email: 'user3@example.com',
      name: 'User 3',
      password: 'password123',
    }).expect(201);

    // Add user3 as member
    const addMember3Response = await post(
      req,
      `/workspaces/${workspaceId}/members`,
      {
        email: 'user3@example.com',
        role: 'read',
      },
    )
      .set('Authorization', `Bearer ${ownerToken}`)
      .expect(201);
    const member3Id = addMember3Response.body.data.id;

    // Admin (memberToken) updates user3 role
    await patch(req, `/workspaces/${workspaceId}/members/${member3Id}`, {
      role: 'write',
    })
      .set('Authorization', `Bearer ${memberToken}`)
      .expect(200);

    // 21. Cannot assign owner role
    await post(req, `/workspaces/${workspaceId}/members`, {
      email: 'another@example.com',
      role: 'owner',
    })
      .set('Authorization', `Bearer ${ownerToken}`)
      .expect(400);

    // 22. Remove member
    await del(req, `/workspaces/${workspaceId}/members/${memberId}`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .expect(200);

    // 23. Member can no longer access workspace
    await get(req, `/workspaces/${workspaceId}`)
      .set('Authorization', `Bearer ${memberToken}`)
      .expect(403);

    // 24. Remove member without permission
    await del(req, `/workspaces/${workspaceId}/members/${memberId}`)
      .set('Authorization', `Bearer ${memberToken}`)
      .expect(403);

    // 25. Delete workspace without permission
    await del(req, `/workspaces/${workspaceId}`)
      .set('Authorization', `Bearer ${memberToken}`)
      .expect(403);

    // 26. Delete workspace (owner only)
    await del(req, `/workspaces/${workspaceId}`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .expect(200);

    // 27. Deleted workspace not in list
    const finalListResponse = await get(req, '/workspaces')
      .set('Authorization', `Bearer ${ownerToken}`)
      .expect(200);

    const deletedWorkspace = finalListResponse.body.data.find(
      (w: { id: string }) => w.id === workspaceId,
    );
    expect(deletedWorkspace).toBeUndefined();

    // 28. Cannot access deleted workspace
    await get(req, `/workspaces/${workspaceId}`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .expect(404);
  });
});
