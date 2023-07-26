const express = require('express');
const router = express.Router();
const autoIndex = require('express-autoindex');
const path = require('node:path');
const increment = require('../utils/increment.js');

const generated = path.join(__dirname, '..', '..', 'blocklist', 'generated');
const logs = path.join(__dirname, '..', '..', 'logs');
const options = { customTemplate: path.join(__dirname, '..', 'views', 'autoindex', 'default.html'), dirAtTop: true };

router.use('/generated', autoIndex(generated, options), increment.blocklist, express.static(generated));
router.use('/logs', autoIndex(logs, options), express.static(logs));
router.use('*', increment.requests);

module.exports = router;