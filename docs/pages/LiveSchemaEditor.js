import React from 'react';

const LED = React.createClass({

    render: function () {

        if(typeof window !== 'undefined') {
            var LiveSchemaEditor  = require('../../src/components/LiveSchemaEditor.js');
            return <LiveSchemaEditor />;
        }

        return null;
    }
});

export default LED;
