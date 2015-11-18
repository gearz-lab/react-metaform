import React from 'react';

import Root from './pages/Root';
import Demo from './pages/Demo.js';

import {Route} from 'react-router';

var DefaultComponent = React.createClass({
    render: function() {
        return <div>Please go to /react-metaform/demo.html</div>;
    }
});

export default (
    <Route path='/' component={Root}>
        <Route path='/react-metaform/demo.html' component={Demo} />
    </Route>
)
