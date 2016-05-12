import React from 'react';
import {Router} from 'react-router'
import routes from './Routes';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router'
import {render} from 'react-dom';
import Styles from './less/styles.less';
import {loadPresets} from './actions/presets.js';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

store.dispatch(loadPresets());

render(
    <Provider store={store}>
        <Router history={history} routes={routes}/>
    </Provider>,
    document.getElementById('#app_container')
);    