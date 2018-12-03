const axios = require('axios');

const DEFAULT_TIMEOUT = 30000;
const DEFAULT_DELAY = 1000;

module.exports.BACKEND_SERVER_URL = 'http://localhost:8080/health';
module.exports.FRONTEND_SERVER_URL = 'http://localhost:3000';
module.exports.waitForServer = (url, timeout = DEFAULT_TIMEOUT, delay = DEFAULT_DELAY) => {
	const startTime = Date.now();

	console.log(`Polling server at url: ${url}`);

	return new Promise((resolve, reject) => {
		const fetch = () => {
			axios.get(url).then(
				resolve,
				(err) => {
					const hasTimedOut = Date.now() - startTime > timeout;

					if (hasTimedOut) {
						console.error(`Timed out waiting for server at url: ${url}`);
						reject(err);
					} else {
						setTimeout(fetch, delay);
					}
				}
			);
		};

		fetch();
	})
};


