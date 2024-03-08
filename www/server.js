const express = require('express');
const helmet = require('helmet');
const path = require('node:path');
const WebSocket = require('ws');

// Middleware imports
const timeout = require('./middlewares/timeout.js');
const morgan = require('./middlewares/morgan.js');
const limiter = require('./middlewares/ratelimit.js');
const increment = require('./middlewares/increment.js');
const { notFound, internalError } = require('./middlewares/other/errors.js');

// MongoDB
require('./database/mongoose.js');

// Express instance
const app = express();

// Websocket
const ws = new WebSocket.Server({ port: process.env.WS_PORT });
require('./websocket.js')(ws);

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

// Static (docs)
app.use('/docs', express.static(path.join(__dirname, '..', 'docs')));



// Stats
app.get('*', increment.requests);

// Endpoints
app.use(require('./routes/Main.js'));

// Blocklists
app.use(require('./routes/Blocklists/Deprecated.js'));
app.use(require('./routes/Blocklists/Main.js'));

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