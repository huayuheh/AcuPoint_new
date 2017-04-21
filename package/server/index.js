'use strict';

// Load environment variables defined in .env into process.env
process.env = require('node-env-file')('.env');

// Apply configurations (minimum ip & port) to server and start
// both web and socket server
const CONFIG= require('./config/env')( process.env )
    , SERVER = require('./config/hapi')( CONFIG )
    , IO = require('./config/sockets')( SERVER );  

// Load accessible url routes. Minimum root HTML page
require('./routes/index')( SERVER );

// Setup motion sensor with socket server
require('./config/motion')( IO );

module.exports = SERVER;
