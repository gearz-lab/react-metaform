import React from 'react';

const LiveSchemaDesignerPage = React.createClass({

    render: function () {

        if(typeof window !== 'undefined') {
            let initialPreset = this.props.query.preset ?  this.props.query.preset : 'textbox';
            var LiveSchemaDesigner  = require('../components/LiveSchemaDesigner.js');
            return <LiveSchemaDesigner initialPreset={initialPreset} />;
        }

        return null;
    }
});

export default LiveSchemaDesignerPage;
