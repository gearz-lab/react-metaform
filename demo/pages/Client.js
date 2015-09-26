import React from 'react';
import Router from './Router.js';

import Styles from './less/styles.less';

// TODO: Move this to Webpack
// For React devtools
window.React = React;

Router.run((Handler, state) => {
    React.render(<Handler/>, document.getElementById('#app_container'));
});
