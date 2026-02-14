/* eslint-disable */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { DatabaseService } from '../src/core/database/database.service';
import { WorkspaceRole } from '@backend/modules/workspace/dto/workspace.dto';
import {
  createRequest,
  postData,
  post,
  get,
  patch,
  del,
} from './test-request.helper';

describe('Pages & Blocks E2E Tests', () => {
  let app: INestApplication;
  let db: DatabaseService;
  let accessToken: string;
  let workspaceId: string;
  let rootPageId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    await app.listen(0);

    db = moduleFixture.get<DatabaseService>(DatabaseService);

    const req = createRequest(app);

    const email = `test-pages-${Date.now()}@example.com`;
    await post(req, '/auth/register', {
      email,
      password: 'Password123!',
      name: 'Test User',
    });

    const loginRes = await post(req, '/auth/login', {
      email,
      password: 'Password123!',
    });

    accessToken = loginRes.body.data.accessToken;

    const wsRes = await post(req, '/workspaces', {
      name: 'Test Workspace',
    });
    workspaceId = wsRes.body.data.id;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Pages API', () => {
    it('should create a root page', async () => {
      const req = createRequest(app);
      const res = await post(req, `/workspaces/${workspaceId}/pages`, {
        title: 'Root Page',
        icon: '📄',
      });

      expect(res.body.data.title).toBe('Root Page');
      expect(res.body.data.workspace_id).toBe(workspaceId);
      expect(res.body.data.parent_page_id).toBeNull();
      rootPageId = res.body.data.id;
    });

    it('should create a child page', async () => {
      const req = createRequest(app);
      const res = await post(req, `/workspaces/${workspaceId}/pages`, {
        title: 'Child Page',
        parentPageId: rootPageId,
      });

      expect(res.body.data.title).toBe('Child Page');
      expect(res.body.data.parent_page_id).toBe(rootPageId);
    });

    it('should get page tree', async () => {
      const req = createRequest(app);
      const res = await get(req, `/workspaces/${workspaceId}/pages`);

      expect(Array.isArray(res.body.data)).toBe(true);
      const root = res.body.data.find((p: any) => p.id === rootPageId);
      expect(root).toBeDefined();
      expect(root.children.length).toBeGreaterThan(0);
      expect(root.children[0].title).toBe('Child Page');
    });

    it('should update a page', async () => {
      const req = createRequest(app);
      const res = await patch(req, `/pages/${rootPageId}`, {
        title: 'Updated Root Page',
      });

      expect(res.body.data.title).toBe('Updated Root Page');
    });

    it('should prevent moving page to its descendant', async () => {
      const req = createRequest(app);
      const childRes = await post(req, `/workspaces/${workspaceId}/pages`, {
        title: 'Another Child',
        parentPageId: rootPageId,
      });
      const childId = childRes.body.data.id;

      await post(req, `/pages/${rootPageId}/move`, {
        parentPageId: childId,
      }).expect(400);
    });
  });

  describe('Blocks API', () => {
    let textBlockId: string;

    it('should create a text block', async () => {
      const req = createRequest(app);
      const res = await post(req, `/pages/${rootPageId}/blocks`, {
        type: 'text',
        content: {
          text: '# Hello world',
          format: 'markdown',
        },
      });

      expect(res.body.data.block_type).toBe('text');
      expect(res.body.data.content.text).toBe('# Hello world');
      textBlockId = res.body.data.id;
    });

    it('should fail creating block with invalid type', async () => {
      const req = createRequest(app);
      await post(req, `/pages/${rootPageId}/blocks`, {
        type: 'invalid-type',
        content: {},
      }).expect(400);
    });

    it('should get all blocks for a page', async () => {
      const req = createRequest(app);
      const res = await get(req, `/pages/${rootPageId}/blocks`);

      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
      expect(res.body.data[0].id).toBe(textBlockId);
    });

    it('should update block content', async () => {
      const req = createRequest(app);
      const res = await patch(req, `/blocks/${textBlockId}`, {
        content: {
          text: '# Updated content',
          format: 'markdown',
        },
      });

      expect(res.body.data.content.text).toBe('# Updated content');
    });

    it('should delete a block', async () => {
      const req = createRequest(app);
      await del(req, `/blocks/${textBlockId}`);

      const res = await get(req, `/pages/${rootPageId}/blocks`);

      const deleted = res.body.data.find((b: any) => b.id === textBlockId);
      expect(deleted).toBeUndefined();
    });
  });

  describe('Permissions', () => {
    it('should prevent other users from accessing pages', async () => {
      const req = createRequest(app);

      const secondUserEmail = `test-pages-other-${Date.now()}@example.com`;
      await post(req, '/auth/register', {
        email: secondUserEmail,
        password: 'Password123!',
        name: 'Other User',
      });

      const secondLoginRes = await post(req, '/auth/login', {
        email: secondUserEmail,
        password: 'Password123!',
      });

      const secondAccessToken = secondLoginRes.body.data.accessToken;

      const req2 = createRequest(app);
      await get(req2, `/pages/${rootPageId}`)
        .set('Authorization', `Bearer ${secondAccessToken}`)
        .expect(403);
    });
  });
});
