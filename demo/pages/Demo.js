import React from 'react';

const LiveSchemaEditorPage = React.createClass({

    render: function () {

        if(typeof window !== 'undefined') {
            let initialPreset = this.props.location.query.preset ?  this.props.location.query.preset : 'textbox';
            var LiveSchemaEditor  = require('../components/LiveSchemaEditor.js');
            return <LiveSchemaEditor initialPreset={initialPreset} />;
        }

        return null;
    }
});

export default LiveSchemaEditorPage;
