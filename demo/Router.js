// router
import React from 'react';
import Router from 'react-router';
import routes from './Routes';

// which is just a shortcut for
var router = Router.create({
    routes: routes,
    location: Router.HistoryLocation
});

if(window) {
    window.router = router;
}

export default router;