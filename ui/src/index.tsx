import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {MainLayout} from 'layouts/MainLayout';
import {Router} from 'routing/Router';

ReactDOM.render(
	<MainLayout><Router/></MainLayout>,
	document.getElementById('root')
);
