import React from 'react';
import metadataProvider from '../../lib/metadataProvider.js';
import MetaFormGroup from '../groupComponents/MetaFormGroup.js';
import Glyphicon from 'react-bootstrap/lib/Glyphicon.js';
import _ from 'underscore';

const EntityContainer = React.createClass({

    propTypes: {
        name: React.PropTypes.string.isRequired,
        componentFactory: React.PropTypes.object.isRequired
    },

    render: function () {

        var header = this.props.displayName
            ? <header className="metaform-group-header no-lateral-margin">
                <span className="metaform-group-title">
                    {this.props.displayName}
                </span>
        </header>
            : null;


        return <div className="entity-container">
            {header}
            <div className="entity-container-content">
                {
                    this.props.componentFactory.buildGroupComponent({
                        component: this.props.layout.component,
                        layout: this.props.layout,
                        fields: this.props.fields,
                        componentFactory: this.props.componentFactory
                    })
                }
            </div>
        </div>;
    }
});

export default EntityContainer;