const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('node:path');
const logger = require('./middlewares/morgan.js');
const limiter = require('./middlewares/ratelimit.js');
const { notFound, internalError } = require('./middlewares/other/errors.js');

// Express instance
const app = express();

// Set
app.set('trust proxy', 1);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use
app.use(cors({ origin: true }));
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(logger);
app.use(limiter);


// Static
app.use('/generated', express.static(path.join(__dirname, '..', 'blocklist', 'generated')));

// Endpoints
app.get('/', (req, res) => res.render('index.ejs'));


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