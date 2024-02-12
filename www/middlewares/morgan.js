const morgan = require('morgan');

const userAgentsToSkip = [
	'Better Uptime Bot Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
];

const userAgents = [
	...userAgentsToSkip,

	// Google
	'Googlebot/2.1 (+http://www.google.com/bot.html)',
	'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
	'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.6045.159 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',

	// Bing
	'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm) Chrome/116.0.1938.76 Safari/537.36',

	// DDG
	'DuckDuckGo/1.60.1 CFNetwork/1410.0.3 Darwin/22.6.0',
	'Mozilla/5.0 (compatible; DuckDuckGo-Favicons-Bot/1.0; +http://duckduckgo.com)',

	// Yandex
	'Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)',

	// Yahoo
	'Mozilla/5.0 (compatible; Y!J-WSC/1.0; +https://yahoo.jp/3BSZgF)',
	'Mozilla/5.0 (compatible; Yahoo! Slurp; http://help.yahoo.com/help/us/ysearch/slurp)',

	// ChatGPT
	'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot',

	// Other
	'IAS Crawler (ias_crawler; http://integralads.com/site-indexing-policy/)',
	'Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)',
	'Mozilla/5.0 (compatible; GrapeshotCrawler/2.0; +http://www.grapeshot.co.uk/crawler.php)',
	'Mozilla/5.0 (compatible; proximic; +https://www.comscore.com/Web-Crawler)',
	'Mozilla/5.0 (compatible; TTD-Content; +https://www.thetradedesk.com/general/ttd-content)',
	'Mozilla/5.0 (Linux; Android 7.0;) AppleWebKit/537.36 (KHTML, like Gecko) Mobile Safari/537.36 (compatible; PetalBot;+https://webmaster.petalsearch.com/site/petalbot)',
];

const skipUserAgent = () => req => {
	const userAgent = req.headers['user-agent'];
	return userAgentsToSkip.includes(userAgent);
};

const normalizeBody = ({ body }) => {
	if (!(body && typeof body === 'object' && Object.keys(body).length)) return null;

	return JSON.stringify(body);
};

morgan.token('body', normalizeBody);

module.exports = {
	use: morgan('[:status :method :response-time ms] :url :user-agent ":referrer" :body', { skip: skipUserAgent() }),
	userAgents,
};