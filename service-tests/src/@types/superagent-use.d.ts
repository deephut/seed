declare module 'superagent-use' {
	import {SuperAgent, SuperAgentRequest, Plugin} from 'superagent';

	interface SuperagentUse {
		use: (plugin: Plugin) => this
	}

	type SuperagentUseFactory = <T>(agent: T) => T & SuperagentUse;

	const superagentUsePlugin: SuperagentUseFactory;

	export = superagentUsePlugin;
}
