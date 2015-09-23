import React from 'react';
import metadataProvider from '../../lib/metadataProvider.js';
import MetaFormGroup from '../MetaFormGroup.js';
import GlyphButton from '../GlyphButton.js';

const CollectionContainerItem = React.createClass({
    render: function () {
        return <div className="collection-container-item">
            <div className="collection-container-remove-item-wrap">
                <GlyphButton glyph="minus" text="" />
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

                </CollectionContainerItem>
                <div className="">
                    <span className="pull-right">
                        <GlyphButton glyph="plus" text="Add" />
                    </span>
                </div>
            </div>
        );
    }
});

export default CollectionContainer;