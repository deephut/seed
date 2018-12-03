const {runYarnCommand, killAll, kill} = require('./runYarnCommand');
const {waitForServer, BACKEND_SERVER_URL, FRONTEND_SERVER_URL} = require('./waitForServerStart');

const client = runYarnCommand('start:ui');
const server = runYarnCommand('start:server');

Promise.all([
	waitForServer(BACKEND_SERVER_URL),
	waitForServer(FRONTEND_SERVER_URL)
])
	.then(
		() => {
			runYarnCommand('start:BrowserTests').on('exit', code => {
				process.exitCode = code; // success of this script depends on the success of the tests
				kill(client);
				kill(server);
				runYarnCommand('server:dropDatabase');
			});
		},
		() => {
			process.exitCode = 1;
			killAll()
		}
	);

