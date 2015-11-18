import React from 'react';
import ReactDom from 'react-dom';
import { Router } from 'react-router'
import routes from './Routes';

import Styles from './less/styles.less';

const createBrowserHistory = require('history/lib/createBrowserHistory');
ReactDom.render ((
    <Router history={createBrowserHistory()}>
        {routes}
    </Router>
),  document.getElementById('#app_container'));
