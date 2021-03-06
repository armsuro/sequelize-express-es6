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
   * Default constants
   */
  websocket_path: process.env.WEBSOCKET_PATH || '/socket.io',
  default_cache_ttl: process.env.DEFAULT_CACHE_TTL || 10,
  slack_url: process.env.SLACK_URL || 'https://hooks.slack.com/services/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',

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
    mysql: {
      uri: process.env.MYSQL_URI || 'mysql://root:123456@localhost/live_video_streaming',
    },
  },
  test: {
    port: 5678,
    mysql: {
      uri: process.env.MYSQL_URI || 'MYSQL://root:127.0.0.1/live_video_streaming',
    },
  },
  production: {
    mysql: {
       uri: process.env.MYSQL_URI || 'MYSQL://root:127.0.0.1/live_video_streaming',
    },
  },
};

// Recursively merge configurations
export default merge(defaultConfig, environmentConfigs[process.env.NODE_ENV] || {});
