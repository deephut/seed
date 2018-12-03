const treeKill = require('tree-kill');
const {runYarnCommand} = require('./runYarnCommand');
const {BACKEND_SERVER_URL, waitForServer} = require("./waitForServerStart");

const server = runYarnCommand('start:server');

waitForServer(BACKEND_SERVER_URL).then(() => {
	runYarnCommand('start:serviceTests').on('exit', code => {
		process.exitCode = code; // success of this script depends on the success of the tests
		treeKill(server.pid);
		runYarnCommand('server:dropDatabase');
	});
});
