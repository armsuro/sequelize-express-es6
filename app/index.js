// Load environment variables
require('dotenv').config();

// Initialize Database
global.db = require('./database');

// Initialize Server
require('./server');
