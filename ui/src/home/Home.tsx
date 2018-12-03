import * as React from 'react';
import {SPC} from 'lib/SPC';
import {Link} from 'routing/Link';
import * as styles from './Home.scss';

class Home extends SPC<{}> {
	render() {
		return (
			<div>
				<h1 id='todos-link'><Link className={styles.link} routeName='todos'>todos</Link></h1>
			</div>
		);
	}
}

export default Home;
