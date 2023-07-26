const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('node:path');
const logger = require('./middlewares/morgan.js');
const limiter = require('./middlewares/ratelimit.js');
const { notFound, internalError } = require('./middlewares/other/errors.js');

// MongoDB
require('./database/mongoose.js');

// Express instance
const app = express();
// Set
app.set('trust proxy', 1);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use
app.use(cors({ origin: true }));
app.use(helmet({ contentSecurityPolicy: false, crossOriginResourcePolicy: false }));
app.use(logger);
app.use(limiter);

// Static
app.use(express.static(path.join(__dirname, 'public')));


// Blocklist
app.use(require('./routes/Blocklist.js'));

// API
app.use(require('./routes/API.js'));

// Endpoints
app.use(require('./routes/Main.js'));

// Markdown
app.use(require('./routes/Markdown.js'));


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
