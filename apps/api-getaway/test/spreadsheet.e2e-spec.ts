import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import cookieParser from 'cookie-parser';
import { AppModule } from '../src/app.module';
import { createRequest, post, postData, get, getData, patchData } from './test-request.helper';

describe('Spreadsheet Engine E2E Tests', () => {
  let app: INestApplication;
  let authToken: string;
  let spreadsheetId: string;
  let sheetId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('v1');
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
    await app.listen(0);

    // Login to get token
    const request = createRequest(app);

    // Ensure user exists by registering
    const testEmail = `admin-${Date.now()}@elbruso.com`;
    await request.post('/v1/auth/register').send({
      email: testEmail,
      name: 'Admin User',
      password: 'Password123!',
    });

    const loginResp = await request.post('/v1/auth/login').send({
      email: testEmail,
      password: 'Password123!',
    });

    authToken = loginResp.body?.data?.accessToken;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a spreadsheet and perform basic operations', async () => {
    const req = createRequest(app);

    // 1. Create Spreadsheet
    const createResp = await req.post('/v1/spreadsheets').send({
      name: 'E2E Test Spreadsheet',
      description: 'Testing the engine'
    }).set('Authorization', `Bearer ${authToken}`);
    
    if (createResp.status !== 201) {
      console.log('Create Spreadsheet Body:', JSON.stringify(createResp.body));
    }
    expect(createResp.status).toBe(201);

    spreadsheetId = createResp.body.data.id;
    expect(spreadsheetId).toBeDefined();

    // 2. Fetch Spreadsheet with Sheets
    const getResp = await get(req, `/spreadsheets/${spreadsheetId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);
    
    expect(getResp.body.data.sheets.length).toBe(1);
    sheetId = getResp.body.data.sheets[0].id;

    // 3. Update Cells
    const cellUpdatePath = `/v1/spreadsheets/${spreadsheetId}/sheets/${sheetId}/cells/batch`;
    const updateResp = await req.put(cellUpdatePath).send([
      {
        row_index: 0,
        col_index: 0,
        data: { raw_value: '10', value_type: 'number' }
      },
      {
        row_index: 0,
        col_index: 1,
        data: { raw_value: '=A1*2', value_type: 'formula' }
      }
    ]).set('Authorization', `Bearer ${authToken}`);
    
    if (updateResp.status !== 200) {
      console.log('Update Cells Error:', updateResp.status, JSON.stringify(updateResp.body));
    }
    expect(updateResp.status).toBe(200);

    // 4. Get Cells and verify raw values
    const cellsResp = await req.get(`/v1/spreadsheets/${spreadsheetId}/sheets/${sheetId}/cells`)
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(cellsResp.status).toBe(200);
    const cells = cellsResp.body.data;
    expect(cells.length).toBeGreaterThanOrEqual(2);
    const cellA1 = cells.find((c: any) => c.row_index === 0 && c.col_index === 0);
    const cellB1 = cells.find((c: any) => c.row_index === 0 && c.col_index === 1);

    expect(cellA1.raw_value).toBe('10');
    expect(cellB1.raw_value).toBe('=A1*2');

    // 5. Update Sheet Settings
    const sheetUpdateResp = await req.put(`/v1/spreadsheets/${spreadsheetId}/sheets/${sheetId}`)
      .send({
        name: 'Updated Sheet Name'
      })
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(sheetUpdateResp.status).toBe(200);

    const getFullResp = await req.get(`/v1/spreadsheets/${spreadsheetId}`)
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(getFullResp.status).toBe(200);
    expect(getFullResp.body.data.sheets[0].name).toBe('Updated Sheet Name');
  });
});
