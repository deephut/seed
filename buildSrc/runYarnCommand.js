const {spawn} = require('child_process');
const treeKill = require('tree-kill');
const children = [];

const commands = {
	runYarnCommand(cmd) {
		const child = spawn('yarn', [cmd], {cwd: __dirname + '/..', env: process.env});
		const pid = child.pid;

		children.push(pid);
		child.stdout.pipe(process.stdout);
		child.stderr.pipe(process.stderr);
		child.on('exit', (code, signal) => {
			console.log(`${cmd} exited with code ${code} and signal ${signal} (pid: ${pid})`);
		});

		return child;
	},
	killAll() {
		children.forEach(pid => treeKill(pid));
	},
	kill(child) {
		treeKill(child.pid);
	}
};

process.on('SIGINT', commands.killAll);

module.exports = commands;
