import axios from 'axios';

const API_URL = 'http://localhost:3001';
let token = '';
let workspaceId = '';
let tableId = '';
let versionId = '';

async function test() {
  console.log('🚀 Starting Advanced E2E Tests...');

  try {
    // 1. Auth
    console.log('\n--- 1. Authentication ---');
    const authRes = await axios.post(`${API_URL}/auth/register`, {
      email: `test_${Date.now()}@example.com`,
      password: 'Password123!',
      name: 'Test Analyst',
    });
    token = authRes.data.accessToken;
    console.log('✅ Registered & Logged in');

    // 2. Get Workspaces
    const wsRes = await axios.get(`${API_URL}/workspaces`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    workspaceId = wsRes.data[0].id;
    console.log(`✅ Default Workspace found: ${workspaceId}`);

    // 3. Create Table
    console.log('\n--- 2. Dynamic Table Creation ---');
    const tableRes = await axios.post(`${API_URL}/workspaces/${workspaceId}/tables`, {
      name: 'Regional Stats',
      description: 'Test catalog binding and matrix formulas',
      initialRows: 5,
      initialColumns: 3,
    }, { headers: { Authorization: `Bearer ${token}` } });
    tableId = tableRes.data.id;
    versionId = tableRes.data.activeVersion.id;
    console.log(`✅ Table created: ${tableId}`);

    // 4. Matrix Formula
    console.log('\n--- 3. Matrix Formulas ---');
    await axios.patch(`${API_URL}/versions/${versionId}/matrix-formulas`, [
      { range: 'C1:C5', formula: '=A1*B1', step: 1 }
    ], { headers: { Authorization: `Bearer ${token}` } });
    console.log('✅ Matrix formulas saved (C = A * B)');

    // 5. Catalog Linking (Regions)
    console.log('\n--- 4. Catalog Integration & Sync ---');
    await axios.post(`${API_URL}/tables/${tableId}/links`, {
      sourceSystemEntity: 'regions',
      linkType: 'lookup_reference',
      metadata: {
        mappings: [
          { sourceField: 'name_ru', targetColIndex: 0 },
          { sourceField: 'id', targetColIndex: 1 }
        ]
      }
    }, { headers: { Authorization: `Bearer ${token}` } });
    console.log('✅ Linked to Regions catalog and triggered sync');
    await new Promise(r => setTimeout(r, 2000)); // Wait for background sync

    // Verify Cells after sync
    const cellsRes = await axios.get(`${API_URL}/versions/${versionId}/cells`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`✅ Synced ${cellsRes.data.length} cells from catalog`);
    if (cellsRes.data.length === 0) throw new Error('No cells synced from catalog');

    // 6. Cell Updates
    console.log('\n--- 5. Manual Data Entry ---');
    await axios.post(`${API_URL}/versions/${versionId}/cells/batch`, {
      cells: [
        { rowIndex: 0, colIndex: 2, cellData: { value: 100 } }, // Column C
      ]
    }, { headers: { Authorization: `Bearer ${token}` } });
    console.log('✅ Manual cell update successful');

    // 7. Formula Analysis
    console.log('\n--- 7. Formula Analysis & Resolution ---');
    // Create another table to link to
    const revenueTableRes = await axios.post(`${API_URL}/workspaces/${workspaceId}/tables`, {
      name: 'Revenue',
      description: 'Source for cross-table formulas',
      initialRows: 10,
      initialColumns: 5,
    }, { headers: { Authorization: `Bearer ${token}` } });
    console.log(`✅ Dependency table 'Revenue' created: ${revenueTableRes.data.id}`);

    const analysisRes = await axios.post(`${API_URL}/formulas/analyze`, {
      formula: '=SUM([Revenue]!A1:B10) + 100',
      workspaceId: workspaceId,
    }, { headers: { Authorization: `Bearer ${token}` } });

    console.log('✅ Analysis result:', JSON.stringify(analysisRes.data, null, 2));

    if (!analysisRes.data.valid) throw new Error('Formula should be valid');
    if (analysisRes.data.externalDependencies.length === 0) throw new Error('Should have 1 external dependency');
    if (analysisRes.data.externalDependencies[0].tableName !== 'Revenue') throw new Error('Incorrect table resolved');

    console.log('\n🏁 All Advanced tests passed successfully!');
  } catch (error: any) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    process.exit(1);
  }
}

test();
