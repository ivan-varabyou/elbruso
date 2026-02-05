/* eslint-disable @typescript-eslint/no-require-imports */
// Load test environment variables before anything else
const path = require('path');
const dotenv = require('dotenv');

const envPath = path.join(__dirname, '..', '.env.test');
console.log('Loading test env from:', envPath);
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error('Error loading .env.test:', result.error);
} else {
  console.log('Test environment loaded successfully');
  console.log('DB_NAME:', process.env.DB_NAME);
  console.log('DB_HOST:', process.env.DB_HOST);
  console.log('DB_PORT:', process.env.DB_PORT);
}
