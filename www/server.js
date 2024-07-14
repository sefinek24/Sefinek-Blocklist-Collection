const express = require('express');
const helmet = require('helmet');
const path = require('node:path');

// Middleware imports
const timeout = require('./middlewares/timeout.js');
const morgan = require('./middlewares/morgan.js');
const limiter = require('./middlewares/ratelimit.js');
const updateStats = require('./middlewares/updateStats.js');
const { notFound, internalError } = require('./middlewares/other/errors.js');

// Express instance
const app = express();

// Set
app.set('trust proxy', 1);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use
app.use(helmet({ contentSecurityPolicy: false, crossOriginResourcePolicy: false }));

// Static (public)
app.use(express.static(path.join(__dirname, 'public')));

// Morgan & ratelimits & timeout
app.use(morgan.use);
app.use(limiter);
app.use(timeout());


// Stats
app.get('*', updateStats);

// Endpoints
app.use(require('./routes/Main.js'));

// Blocklists
app.use(require('./routes/Blocklists/Main.js'));
app.use(require('./routes/Blocklists/Deprecated.js'));

// Markdown
app.use(require('./routes/Markdown.js'));

// API
app.use(require('./routes/API.js'));


// Errors
app.use(notFound);
app.use(internalError);

// Run server
app.listen(process.env.PORT, () => {
	if (process.env.NODE_ENV === 'production') {
		try {
			process.send('ready');
		} catch (err) {
			// . . .
		}
	} else {
		console.log(`Website https://blocklist.sefinek.net is running on http://127.0.0.1:${process.env.PORT}`);
	}
});