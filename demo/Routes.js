import React from 'react';
import App from './containers/App';
import Demo from './pages/Demo.js';

import {Route, IndexRoute} from 'react-router';

export default (
    <Route path='/' component={App}>
        <IndexRoute component={Demo}/>
    </Route>
);
