import React from 'react';
import Router from 'react-router';

const Root = React.createClass({
    render() {
        return <div className="container-fluid">
                <Router.RouteHandler/>
            </div>;
    }
});


module.exports = Root;
