const dotenv = require('dotenv');
const { join } = require('path');

const runningInTestMode = process.env.NODE_ENV === 'test';

const loadTestDotEnv = join(__dirname, '../.env.test');
const loadProductionDotEnv = join(__dirname, '../.env');
const loadDevelopmentDotEnv = '.env';

const runningInNormalMode = () =>
  process.env.NODE_ENV === 'production'
    ? loadProductionDotEnv
    : loadDevelopmentDotEnv;

dotenv.config({
  path: runningInTestMode ? loadTestDotEnv : runningInNormalMode(),
});
