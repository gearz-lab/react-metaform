import React from 'react';
import metadataProvider from '../../lib/metadataProvider.js';
import MetaFormGroup from '../groupComponents/MetaFormGroup.js';

const EntityContainer = React.createClass({

    propTypes: {
        name: React.PropTypes.string.isRequired,
        componentFactory: React.PropTypes.object.isRequired
    },

    render: function() {
        var header = this.props.displayName ?
            <header className="meta-form-entity-title"><span>{this.props.displayName}</span></header>
            : null;
        return <div>
            {header}
            {
                this.props.componentFactory.buildGroupComponent({
                    component: this.props.layout.component,
                    layout: this.props.layout,
                    fields: this.props.fields,
                    componentFactory: this.props.componentFactory
                })
            }
        </div>;
    }
});

export default EntityContainer;