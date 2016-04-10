import React from 'react';

var Layout = React.createClass({

    render: function () {
        return (
            <div>
                <div className="container-fluid">
                    {this.props.children}
                </div>
                {
                    (() => {
                        if (process.env.NODE_ENV !== 'production') {
                            const DevTools = require('./DevTools');
                            return <DevTools />;
                        }
                    })()
                }
            </div>
        );
    }
});

export default Layout;