const express = require('express');
const router = express.Router();
const autoIndex = require('express-autoindex');
const path = require('node:path');
const increment = require('../middlewares/increment.js');

const generated = path.join(__dirname, '..', '..', 'blocklist', 'generated');
const ZeroZeroZeroZero = path.join(__dirname, '..', '..', 'blocklist', 'generated', '0.0.0.0');

const logs = path.join(__dirname, '..', 'public', 'logs');
const options = { customTemplate: path.join(__dirname, '..', 'views', 'autoindex', 'default.html'), dirAtTop: true };


// Blocklists & logs
router.use('/generated', increment.blocklist, autoIndex(generated, options), express.static(generated));
router.use('/logs', autoIndex(logs, options), express.static(logs));

// Deprecated endpoints
router.get('/generated/0.0.0.0/blocklist/useless-websites.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/useless-websites.txt`));


module.exports = router;