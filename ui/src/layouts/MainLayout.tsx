import * as React from 'react';
import * as styles from './MainLayout.scss';
import {SPC} from 'lib/SPC';

const logo = require('../img/logo.svg');

export class MainLayout extends SPC<{}> {
	render() {
		return (
			<div className={styles.mainLayout}>
				<div className={styles.header}>
					<img src={logo} className={styles.logo} alt='logo'/>
					<h2>Welcome to Todos</h2>
				</div>
				{this.props.children}
			</div>
		);
	}
}
