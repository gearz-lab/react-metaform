import React from 'react';
import metadataProvider from '../../lib/metadataProvider.js';
import MetaFormGroup from '../MetaFormGroup.js';
import Button from 'react-bootstrap/lib/Button.js';
import Glyphicon from 'react-bootstrap/lib/Glyphicon.js';

const CollectionContainerItem = React.createClass({
    render: function () {
        return <div className="collection-container-item">
            <div className="collection-container-remove-item-wrap">
                <Button>
                    <Glyphicon glyph="minus"/>
                </Button>
            </div>
            <div className="collection-container-array-item-wrap">
                {this.props.children}
            </div>
        </div>;
    }
});

const CollectionContainer = React.createClass({

    propTypes: {
        name: React.PropTypes.string.isRequired
    },

    render: function () {
        return (
            <div>
                <CollectionContainerItem>
                    Fuck this shit
                </CollectionContainerItem>
            </div>
        );
    }
});

export default CollectionContainer;