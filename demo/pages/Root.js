import React from 'react';
import Router from 'react-router';

const Root = React.createClass({
    render() {
        return <div className="container-fluid">
                {this.props.children}
            </div>;
    }
});


export default Root;
