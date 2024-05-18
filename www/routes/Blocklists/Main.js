const express = require('express');
const router = express.Router();
const autoIndex = require('express-autoindex');
const path = require('node:path');

// Paths
const generated = path.join(__dirname, '..', '..', '..', 'blocklists', 'generated');
const logs = path.join(__dirname, '..', '..', 'public', 'logs');
const optionsGenerated = { customTemplate: path.join(__dirname, '..', '..', 'views', 'autoindex', 'generated.html') };
const optionsLogs = { customTemplate: path.join(__dirname, '..', '..', 'views', 'autoindex', 'logs.html') };


// Serve block lists
router.use('/generated/v1', autoIndex(generated, optionsGenerated));

// Logs
router.use('/logs/v1', autoIndex(logs, optionsLogs), express.static(logs));


module.exports = router;