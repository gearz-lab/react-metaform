import React from 'react';
import metadataProvider from '../../lib/metadataProvider.js';
import MetaFormGroup from '../MetaFormGroup.js';

const EntityContainer = React.createClass({

    propTypes: {
        name: React.PropTypes.string.isRequired
    },

    render: function() {
        return <MetaFormGroup layout={this.props.layout} componentProps={this.props.componentProps} />
    }
});

export default EntityContainer;