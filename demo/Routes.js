import React from 'react';

import Root from './pages/Root';
import Demo from './pages/Demo.js';

import {Route, DefaultRoute, NotFoundRoute} from 'react-router';

export default (
    <Route name='app' path='/react-metaform/' handler={Root}>
        <Route name='demo' path='demo.html' handler={Demo}/>
    </Route>
)
