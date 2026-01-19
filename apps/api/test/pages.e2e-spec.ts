/* eslint-disable */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { DatabaseService } from '../src/database/database.service';
import { WorkspaceRole } from '../src/workspaces/dto';

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

    db = moduleFixture.get<DatabaseService>(DatabaseService);

    // 1. Register and login
    const email = `test-pages-${Date.now()}@example.com`;
    await request(app.getHttpServer()).post('/auth/register').send({
      email,
      password: 'Password123!',
      name: 'Test User',
    });

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email,
        password: 'Password123!',
      });

    accessToken = loginRes.body.accessToken;

    // 2. Create workspace
    const wsRes = await request(app.getHttpServer())
      .post('/workspaces')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Test Workspace',
      })
      .expect(201);

    workspaceId = wsRes.body.id;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Pages API', () => {
    it('should create a root page', async () => {
      const res = await request(app.getHttpServer())
        .post(`/workspaces/${workspaceId}/pages`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: 'Root Page',
          icon: '📄',
        })
        .expect(201);

      expect(res.body.title).toBe('Root Page');
      expect(res.body.workspace_id).toBe(workspaceId);
      expect(res.body.parent_page_id).toBeNull();
      rootPageId = res.body.id;
    });

    it('should create a child page', async () => {
      const res = await request(app.getHttpServer())
        .post(`/workspaces/${workspaceId}/pages`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: 'Child Page',
          parentPageId: rootPageId,
        })
        .expect(201);

      expect(res.body.title).toBe('Child Page');
      expect(res.body.parent_page_id).toBe(rootPageId);
    });

    it('should get page tree', async () => {
      const res = await request(app.getHttpServer())
        .get(`/workspaces/${workspaceId}/pages`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      const root = res.body.find((p: any) => p.id === rootPageId);
      expect(root).toBeDefined();
      expect(root.children.length).toBeGreaterThan(0);
      expect(root.children[0].title).toBe('Child Page');
    });

    it('should update a page', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/pages/${rootPageId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: 'Updated Root Page',
        })
        .expect(200);

      expect(res.body.title).toBe('Updated Root Page');
    });

    it('should prevent moving page to its descendant', async () => {
      const childRes = await request(app.getHttpServer())
        .post(`/workspaces/${workspaceId}/pages`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: 'Another Child',
          parentPageId: rootPageId,
        });
      const childId = childRes.body.id;

      await request(app.getHttpServer())
        .post(`/pages/${rootPageId}/move`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          parentPageId: childId,
        })
        .expect(400);
    });
  });

  describe('Blocks API', () => {
    let textBlockId: string;

    it('should create a text block', async () => {
      const res = await request(app.getHttpServer())
        .post(`/pages/${rootPageId}/blocks`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          type: 'text',
          content: {
            text: '# Hello world',
            format: 'markdown',
          },
        })
        .expect(201);

      expect(res.body.block_type).toBe('text');
      expect(res.body.content.text).toBe('# Hello world');
      textBlockId = res.body.id;
    });

    it('should fail creating block with invalid type', async () => {
      await request(app.getHttpServer())
        .post(`/pages/${rootPageId}/blocks`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          type: 'invalid-type',
          content: {},
        })
        .expect(400);
    });

    it('should get all blocks for a page', async () => {
      const res = await request(app.getHttpServer())
        .get(`/pages/${rootPageId}/blocks`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0].id).toBe(textBlockId);
    });

    it('should update block content', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/blocks/${textBlockId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          content: {
            text: '# Updated content',
            format: 'markdown',
          },
        })
        .expect(200);

      expect(res.body.content.text).toBe('# Updated content');
    });

    it('should delete a block', async () => {
      await request(app.getHttpServer())
        .delete(`/blocks/${textBlockId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      const res = await request(app.getHttpServer())
        .get(`/pages/${rootPageId}/blocks`)
        .set('Authorization', `Bearer ${accessToken}`);

      const deleted = res.body.find((b: any) => b.id === textBlockId);
      expect(deleted).toBeUndefined();
    });
  });

  describe('Permissions', () => {
    it('should prevent other users from accessing pages', async () => {
      // 1. Create second user
      const secondUserEmail = `test-pages-other-${Date.now()}@example.com`;
      await request(app.getHttpServer()).post('/auth/register').send({
        email: secondUserEmail,
        password: 'Password123!',
        name: 'Other User',
      });

      const secondLoginRes = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: secondUserEmail,
          password: 'Password123!',
        });

      const secondAccessToken = secondLoginRes.body.accessToken;

      // 2. Try to access first user's page
      await request(app.getHttpServer())
        .get(`/pages/${rootPageId}`)
        .set('Authorization', `Bearer ${secondAccessToken}`)
        .expect(403);
    });
  });
});
