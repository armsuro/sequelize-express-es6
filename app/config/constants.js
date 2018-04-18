import path from 'path';
import merge from 'lodash/merge';

// Default configuations applied to all environments
const defaultConfig = {
  env: process.env.NODE_ENV,
  get envs() {
    return {
      test: process.env.NODE_ENV === 'test',
      development: process.env.NODE_ENV === 'development',
      production: process.env.NODE_ENV === 'production',
    };
  },

  version: require('../../package.json').version,
  root: path.normalize(__dirname + '/../../..'),
  port: process.env.PORT || 4567,
  ip: process.env.IP || '0.0.0.0',
  apiPrefix: '', // Could be /api/resource or /api/v2/resource

  /**
   * Security configuation options regarding sessions, authentication and hashing
   */
  security: {
    sessionSecret: process.env.SESSION_SECRET || 'i-am-the-secret-key',
    sessionExpiration: process.env.SESSION_EXPIRATION || 60 * 60 * 24 * 7, // 1 week
    saltRounds: process.env.SALT_ROUNDS || 12,
  },
};

// Environment specific overrides
const environmentConfigs = {
  development: {
    postgres: {
      uri: process.env.postgres_URI || 'postgres://postgres:123456@localhost/varduk',
    },
  },
  test: {
    port: 5678,
    postgres: {
      uri: process.env.postgres_URI || 'postgres://postgres:123456@localhost/varduk',
    },
  },
  production: {
    postgres: {
       uri: process.env.postgres_URI || 'postgres://postgres:123456@localhost/varduk',
    },
  },
};

// Recursively merge configurations
export default merge(defaultConfig, environmentConfigs[process.env.NODE_ENV] || {});
