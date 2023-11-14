const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('node:path');
const WebSocket = require('ws');
const increment = require('./middlewares/increment.js');
const logger = require('./middlewares/morgan.js');
const limiter = require('./middlewares/ratelimit.js');
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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use
app.use(cors({ origin: true }));
app.use(helmet({ contentSecurityPolicy: false, crossOriginResourcePolicy: false }));
app.use(logger.use);
app.use(limiter);

// Static
app.use(express.static(path.join(__dirname, 'public')));



// Stats
app.use('*', increment.requests);

// Endpoints
app.use(require('./routes/Main.js'));

// Blocklist
app.use(require('./routes/Blocklist.js'));

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