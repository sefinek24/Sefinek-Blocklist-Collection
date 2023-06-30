const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('node:path');
const parser = require('cron-parser');
const logger = require('./www/middlewares/morgan.js');
const limiter = require('./www/middlewares/ratelimit.js');
const { notFound, internalError } = require('./www/middlewares/other/errors.js');
const { version } = require('./package.json');

// Utils
const increment = require('./www/utils/increment.js');

// MongoDB
require('./www/database/mongoose.js');
const BlockList = require('./www/database/models/Blocklist');

// Express instance
const app = express();

// Set
app.set('trust proxy', 1);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'www', 'views'));

// Use
app.use(cors({ origin: true }));
app.use(helmet({ contentSecurityPolicy: false, crossOriginResourcePolicy: false }));
app.use(logger);
app.use(limiter);

// Static
app.use(express.static(path.join(__dirname, 'www', 'public')));


// Blocklist
app.use('/generated', increment.blocklist, express.static(path.join(__dirname, 'blocklist', 'generated')));
app.get('*', increment.requests);


// Endpoints
app.get('/', async (req, res) => {
	const database = await BlockList.findOne({ domain: process.env.DOMAIN });

	res.render('index.ejs', { database, version });
});

app.get('/update-frequency', (req, res) => {
	const tz = { tz: 'Europe/Warsaw' };
	const github = parser.parseExpression('0 */2 * * *', tz);
	const remote = parser.parseExpression('0 0,6 * * *', tz);

	res.render('update-frequency.ejs', { cron: { github: github.next().toISOString(), remote: remote.next().toISOString() }, version });
});


// Errors
app.use(notFound);
app.use(internalError);

// Run server
app.listen(process.env.PORT, () => {
	if (process.env.NODE_ENV === 'production') {
		process.send('ready');
	} else {
		console.log(`App listening at ${process.env.PROTOCOL}${process.env.DOMAIN}:${process.env.PORT}`);
	}
});
