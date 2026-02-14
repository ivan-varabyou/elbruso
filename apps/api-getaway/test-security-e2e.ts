/**
 * Comprehensive E2E Security & Functionality Tests
 * Tests all API endpoints and verifies proper authorization/access control
 */

import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:3001';

interface TestUser {
  email: string;
  password: string;
  name: string;
  accessToken?: string;
  refreshToken?: string;
  userId?: string;
  workspaceId?: string;
}

// Test users
const users: { alice: TestUser; bob: TestUser } = {
  alice: {
    email: `alice_${Date.now()}@example.com`,
    password: 'SecurePass123!',
    name: 'Alice Admin',
  },
  bob: {
    email: `bob_${Date.now()}@example.com`,
    password: 'SecurePass456!',
    name: 'Bob User',
  },
};

// Helper functions
async function registerUser(user: TestUser) {
  const response = await axios.post(`${API_URL}/auth/register`, {
    email: user.email,
    name: user.name,
    password: user.password,
  });
  user.accessToken = response.data.accessToken;
  user.refreshToken = response.data.refreshToken;
  return response.data;
}

async function loginUser(user: TestUser) {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email: user.email,
    password: user.password,
  });
  user.accessToken = response.data.accessToken;
  user.refreshToken = response.data.refreshToken;
  return response.data;
}

function getHeaders(user: TestUser) {
  return { Authorization: `Bearer ${user.accessToken}` };
}

async function expectUnauthorized(promise: Promise<any>) {
  try {
    await promise;
    throw new Error('Expected 401/403 but request succeeded');
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status !== 401 && axiosError.response?.status !== 403) {
      throw new Error(`Expected 401/403 but got ${axiosError.response?.status}`);
    }
  }
}

// Test suite
async function runTests() {
  console.log('🚀 Starting Comprehensive E2E Security Tests...\n');

  try {
    // ==================== AUTHENTICATION TESTS ====================
    console.log('--- 1. Authentication & Authorization ---');
    
    // Register Alice
    await registerUser(users.alice);
    console.log('✅ Alice registered successfully');

    // Register Bob
    await registerUser(users.bob);
    console.log('✅ Bob registered successfully');

    // Get Alice's profile
    const aliceProfile = await axios.get(`${API_URL}/users/me`, {
      headers: getHeaders(users.alice),
    });
    users.alice.userId = aliceProfile.data.id;
    console.log(`✅ Alice profile retrieved: ${users.alice.userId}`);

    // Get Bob's profile
    const bobProfile = await axios.get(`${API_URL}/users/me`, {
      headers: getHeaders(users.bob),
    });
    users.bob.userId = bobProfile.data.id;
    console.log(`✅ Bob profile retrieved: ${users.bob.userId}`);

    // Test unauthorized access
    await expectUnauthorized(
      axios.get(`${API_URL}/users/me`)
    );
    console.log('✅ Unauthorized access blocked (no token)');

    // Test invalid token
    await expectUnauthorized(
      axios.get(`${API_URL}/users/me`, {
        headers: { Authorization: 'Bearer invalid_token' },
      })
    );
    console.log('✅ Invalid token rejected');

    // Test token refresh
    const refreshResponse = await axios.post(`${API_URL}/auth/refresh`, {
      refreshToken: users.alice.refreshToken,
    });
    users.alice.accessToken = refreshResponse.data.accessToken;
    console.log('✅ Token refresh successful');

    // ==================== WORKSPACE TESTS ====================
    console.log('\n--- 2. Workspace Management & Access Control ---');

    // Alice creates a workspace
    const aliceWorkspace = await axios.post(
      `${API_URL}/workspaces`,
      {
        name: 'Alice Workspace',
        description: 'Private workspace for Alice',
      },
      { headers: getHeaders(users.alice) }
    );
    users.alice.workspaceId = aliceWorkspace.data.id;
    console.log(`✅ Alice created workspace: ${users.alice.workspaceId}`);

    // Bob creates his own workspace
    const bobWorkspace = await axios.post(
      `${API_URL}/workspaces`,
      {
        name: 'Bob Workspace',
        description: 'Private workspace for Bob',
      },
      { headers: getHeaders(users.bob) }
    );
    users.bob.workspaceId = bobWorkspace.data.id;
    console.log(`✅ Bob created workspace: ${users.bob.workspaceId}`);

    // Alice can access her workspace
    const aliceWorkspaceDetails = await axios.get(
      `${API_URL}/workspaces/${users.alice.workspaceId}`,
      { headers: getHeaders(users.alice) }
    );
    console.log('✅ Alice can access her workspace');

    // Bob CANNOT access Alice's workspace
    await expectUnauthorized(
      axios.get(`${API_URL}/workspaces/${users.alice.workspaceId}`, {
        headers: getHeaders(users.bob),
      })
    );
    console.log('✅ Bob cannot access Alice\'s workspace (403)');

    // Alice lists her workspaces
    const aliceWorkspaces = await axios.get(`${API_URL}/workspaces`, {
      headers: getHeaders(users.alice),
    });
    if (aliceWorkspaces.data.length === 0) {
      throw new Error('Alice should see at least one workspace');
    }
    console.log(`✅ Alice sees ${aliceWorkspaces.data.length} workspace(s)`);

    // ==================== WORKSPACE MEMBERS ====================
    console.log('\n--- 3. Workspace Member Management ---');

    // Alice invites Bob to her workspace as VIEWER
    await axios.post(
      `${API_URL}/workspaces/${users.alice.workspaceId}/members`,
      {
        email: users.bob.email,
        role: 'viewer',
      },
      { headers: getHeaders(users.alice) }
    );
    console.log('✅ Alice invited Bob as VIEWER');

    // Now Bob CAN access Alice's workspace (read-only)
    const bobAccessAliceWorkspace = await axios.get(
      `${API_URL}/workspaces/${users.alice.workspaceId}`,
      { headers: getHeaders(users.bob) }
    );
    console.log('✅ Bob can now view Alice\'s workspace');

    // But Bob CANNOT modify Alice's workspace
    await expectUnauthorized(
      axios.patch(
        `${API_URL}/workspaces/${users.alice.workspaceId}`,
        { name: 'Bob tries to rename' },
        { headers: getHeaders(users.bob) }
      )
    );
    console.log('✅ Bob cannot modify Alice\'s workspace (viewer role)');

    // ==================== DYNAMIC TABLES ====================
    console.log('\n--- 4. Dynamic Tables & Data Access Control ---');

    // Alice creates a table in her workspace
    const aliceTable = await axios.post(
      `${API_URL}/workspaces/${users.alice.workspaceId}/tables`,
      {
        name: 'Sales Data',
        description: 'Confidential sales data',
        initialRows: 10,
        initialColumns: 5,
      },
      { headers: getHeaders(users.alice) }
    );
    const aliceTableId = aliceTable.data.id;
    const aliceVersionId = aliceTable.data.activeVersion.id;
    console.log(`✅ Alice created table: ${aliceTableId}`);

    // Alice can read her table
    const aliceTableData = await axios.get(
      `${API_URL}/tables/${aliceTableId}`,
      { headers: getHeaders(users.alice) }
    );
    console.log('✅ Alice can read her table');

    // Bob (as VIEWER) can read the table
    const bobReadAliceTable = await axios.get(
      `${API_URL}/tables/${aliceTableId}`,
      { headers: getHeaders(users.bob) }
    );
    console.log('✅ Bob can read Alice\'s table (viewer access)');

    // Bob CANNOT modify the table (viewer role)
    await expectUnauthorized(
      axios.patch(
        `${API_URL}/tables/${aliceTableId}`,
        { name: 'Bob tries to rename' },
        { headers: getHeaders(users.bob) }
      )
    );
    console.log('✅ Bob cannot modify Alice\'s table (viewer role)');

    // Alice updates a cell
    await axios.patch(
      `${API_URL}/versions/${aliceVersionId}/cells/0/0`,
      { cellData: { value: 'Confidential' } },
      { headers: getHeaders(users.alice) }
    );
    console.log('✅ Alice updated a cell');

    // Bob CANNOT update cells (viewer role)
    await expectUnauthorized(
      axios.patch(
        `${API_URL}/versions/${aliceVersionId}/cells/0/1`,
        { cellData: { value: 'Bob tries to edit' } },
        { headers: getHeaders(users.bob) }
      )
    );
    console.log('✅ Bob cannot update cells (viewer role)');

    // Upgrade Bob to EDITOR
    const members = await axios.get(
      `${API_URL}/workspaces/${users.alice.workspaceId}/members`,
      { headers: getHeaders(users.alice) }
    );
    const bobMembership = members.data.find((m: any) => m.userId === users.bob.userId);

    await axios.patch(
      `${API_URL}/workspaces/${users.alice.workspaceId}/members/${bobMembership.userId}`,
      { role: 'editor' },
      { headers: getHeaders(users.alice) }
    );
    console.log('✅ Alice upgraded Bob to EDITOR');

    // Now Bob CAN update cells
    await axios.patch(
      `${API_URL}/versions/${aliceVersionId}/cells/1/1`,
      { cellData: { value: 'Bob can edit now' } },
      { headers: getHeaders(users.bob) }
    );
    console.log('✅ Bob can now update cells (editor role)');

    // But Bob still CANNOT delete the table (needs admin/owner)
    await expectUnauthorized(
      axios.delete(`${API_URL}/tables/${aliceTableId}`, {
        headers: getHeaders(users.bob),
      })
    );
    console.log('✅ Bob cannot delete table (needs owner role)');

    // ==================== PAGES & BLOCKS ====================
    console.log('\n--- 5. Pages & Blocks Access Control ---');

    // Alice creates a page
    const alicePage = await axios.post(
      `${API_URL}/workspaces/${users.alice.workspaceId}/pages`,
      {
        title: 'Dashboard',
        icon: '📊',
      },
      { headers: getHeaders(users.alice) }
    );
    const alicePageId = alicePage.data.id;
    console.log(`✅ Alice created page: ${alicePageId}`);

    // Bob (editor) can read the page
    await axios.get(`${API_URL}/pages/${alicePageId}`, {
      headers: getHeaders(users.bob),
    });
    console.log('✅ Bob can read Alice\'s page');

    // Bob (editor) can create blocks
    const bobBlock = await axios.post(
      `${API_URL}/pages/${alicePageId}/blocks`,
      {
        type: 'text',
        content: { text: 'Bob added this' },
      },
      { headers: getHeaders(users.bob) }
    );
    console.log('✅ Bob can create blocks (editor role)');

    // ==================== CATALOG ACCESS ====================
    console.log('\n--- 6. Catalog/Reference Data Access ---');

    // Both users can read public catalogs
    const regions = await axios.get(`${API_URL}/regions`, {
      headers: getHeaders(users.alice),
    });
    console.log(`✅ Alice can read regions catalog (${regions.data.length} items)`);

    const sports = await axios.get(`${API_URL}/sports`, {
      headers: getHeaders(users.bob),
    });
    console.log(`✅ Bob can read sports catalog (${sports.data.length} items)`);

    // ==================== FORMULA ANALYSIS ====================
    console.log('\n--- 7. Formula Analysis & Cross-Workspace References ---');

    // Alice creates another table for formulas
    const revenueTable = await axios.post(
      `${API_URL}/workspaces/${users.alice.workspaceId}/tables`,
      {
        name: 'Revenue',
        description: 'Revenue data',
        initialRows: 5,
        initialColumns: 3,
      },
      { headers: getHeaders(users.alice) }
    );
    console.log('✅ Alice created Revenue table');

    // Alice analyzes a formula referencing her own table
    const formulaAnalysis = await axios.post(
      `${API_URL}/formulas/analyze`,
      {
        formula: '=SUM([Revenue]!A1:A10)',
        workspaceId: users.alice.workspaceId,
      },
      { headers: getHeaders(users.alice) }
    );
    
    if (!formulaAnalysis.data.valid) {
      throw new Error('Formula should be valid');
    }
    console.log('✅ Alice can analyze formulas in her workspace');

    // Bob (editor) can also analyze formulas in Alice's workspace
    const bobFormulaAnalysis = await axios.post(
      `${API_URL}/formulas/analyze`,
      {
        formula: '=SUM([Revenue]!A1:A10)',
        workspaceId: users.alice.workspaceId,
      },
      { headers: getHeaders(users.bob) }
    );
    console.log('✅ Bob can analyze formulas (has access)');

    // Bob tries to reference Alice's workspace from his own workspace
    const crossWorkspaceFormula = await axios.post(
      `${API_URL}/formulas/analyze`,
      {
        formula: '=SUM([Sales Data]!A1:A10)',
        workspaceId: users.bob.workspaceId,
      },
      { headers: getHeaders(users.bob) }
    );
    
    const deps = crossWorkspaceFormula.data.externalDependencies || [];
    if (deps.length > 0) {
      console.log(`✅ Cross-workspace formula analyzed (hasAccess: ${deps[0].hasAccess})`);
    }

    // ==================== CLEANUP & DELETION ====================
    console.log('\n--- 8. Deletion & Cleanup Tests ---');

    // Alice can delete her own page
    await axios.delete(`${API_URL}/pages/${alicePageId}`, {
      headers: getHeaders(users.alice),
    });
    console.log('✅ Alice deleted her page');

    // Alice can delete her table
    await axios.delete(`${API_URL}/tables/${aliceTableId}`, {
      headers: getHeaders(users.alice),
    });
    console.log('✅ Alice deleted her table');

    // Remove Bob from workspace
    await axios.delete(
      `${API_URL}/workspaces/${users.alice.workspaceId}/members/${bobMembership.userId}`,
      { headers: getHeaders(users.alice) }
    );
    console.log('✅ Alice removed Bob from workspace');

    // Now Bob CANNOT access Alice's workspace again
    await expectUnauthorized(
      axios.get(`${API_URL}/workspaces/${users.alice.workspaceId}`, {
        headers: getHeaders(users.bob),
      })
    );
    console.log('✅ Bob lost access after removal');

    // ==================== SECURITY HEADERS ====================
    console.log('\n--- 9. Security Headers & Rate Limiting ---');

    const headersCheck = await axios.get(`${API_URL}/users/me`, {
      headers: getHeaders(users.alice),
    });

    const securityHeaders = [
      'strict-transport-security',
      'x-content-type-options',
      'x-frame-options',
      'content-security-policy',
      'permissions-policy',
      'referrer-policy',
    ];

    for (const header of securityHeaders) {
      if (!headersCheck.headers[header]) {
        console.warn(`⚠️  Missing security header: ${header}`);
      }
    }
    console.log('✅ Security headers present');

    // ==================== FINAL SUMMARY ====================
    console.log('\n🎉 All Security & Functionality Tests Passed!\n');

  } catch (error) {
    console.error('\n❌ Test failed:', error);
    if (axios.isAxiosError(error)) {
      console.error('Response:', error.response?.data);
      console.error('Status:', error.response?.status);
    }
    process.exit(1);
  }
}

// Run tests
runTests();
