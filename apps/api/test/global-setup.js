// Global setup for E2E tests - runs once before all tests
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

module.exports = async () => {
  console.log('\n🧹 Cleaning test database...\n');
  
  try {
    const cleanupSQL = `
      TRUNCATE TABLE api_keys, sessions, users RESTART IDENTITY CASCADE;
    `;
    
    const command = `docker exec elbruso-postgres psql -U postgres -d elbruso -c "${cleanupSQL}"`;
    
    const { stdout, stderr } = await execPromise(command);
    
    if (stderr && !stderr.includes('NOTICE')) {
      console.error('Cleanup stderr:', stderr);
    }
    
    console.log('✅ Test database cleaned successfully\n');
  } catch (error) {
    console.error('❌ Failed to clean test database:', error.message);
    console.error('Make sure Docker container "elbruso-postgres" is running\n');
    // Don't fail the tests if cleanup fails - tests might still work
  }
};
