exports.notFound = (req, res) => {
	res.status(404).send('<h1>404 Page was not found 📃</h1><a href="/">Go to Home page...</a>');
};

exports.rateLimit = (req, res) => {
	res.status(429).send('<h1>429 Too many requests 😑</h1>Please try again later.');
};

exports.onTimeout = (req, res) => {
	res.status(503).send('<h1>503 Woah, timeout ⏰</h1>');
};

exports.internalError = (err, req, res, next) => {
	res.status(500).send('<h1>500 Server error 😾</h1>');

	if (err) console.error(err);
	return next;
};

