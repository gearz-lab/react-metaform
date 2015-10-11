import React from 'react';
import metadataProvider from '../../lib/metadataProvider.js';
import MetaFormGroup from '../groupComponents/MetaFormGroup.js';
import GlyphButton from '../GlyphButton.js';
import Glyphicon from 'react-bootstrap/lib/Glyphicon.js';
import DropdownButton from 'react-bootstrap/lib/DropdownButton.js';
import MenuItem from 'react-bootstrap/lib/MenuItem.js';
import Dropdown from 'react-bootstrap/lib/Dropdown.js';
import arrayHelper from'../../lib/helpers/arrayHelper.js';
import _ from 'underscore';

const ArrayContainerItem = React.createClass({

    propTypes: {
        index: React.PropTypes.number.isRequired,
        onAction: React.PropTypes.func,
        addText: React.PropTypes.string
    },

    handleAction: function (e, eventKey) {
        if (this.props.onAction) {
            this.props.onAction(this.props.index, eventKey)
        }
    },

    render: function () {
        return <div className="array-container-item">
            <div className="row">
                <div className="col-md-11">
                    <div className="array-container-item-content">
                        {this.props.children}
                    </div>
                </div>
                <div className="col-md-1">
                    <Dropdown pullRight onSelect={this.handleAction}>
                        <Dropdown.Toggle noCaret bsSize="small">
                            <Glyphicon glyph="cog"/>
                        </Dropdown.Toggle>
                        <Dropdown.Menu >
                            <MenuItem eventKey="remove"><Glyphicon glyph="remove" className="text-danger"/><span
                                className="glyphicon-text text-danger">Remove</span></MenuItem>
                            <MenuItem divider/>
                            <MenuItem eventKey="moveUp"><Glyphicon glyph="chevron-up"/><span className="glyphicon-text">Move up</span></MenuItem>
                            <MenuItem eventKey="moveDown"><Glyphicon glyph="chevron-down"/><span
                                className="glyphicon-text">Move down</span></MenuItem>
                            <MenuItem divider/>
                            <MenuItem eventKey="moveFirst"><Glyphicon glyph="chevron-up"/><span
                                className="glyphicon-text">Move first</span></MenuItem>
                            <MenuItem eventKey="moveLast"><Glyphicon glyph="chevron-down"/><span
                                className="glyphicon-text">Move last</span></MenuItem>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </div>;
    }
});

const ArrayContainer = React.createClass({

    propTypes: {
        name: React.PropTypes.string.isRequired
    },

    handleAdd: function () {
        if (this.props.onChange) {
            let value = this.props.value;
            value.push({});
            this.props.onChange({id: this.props.id, value: value});
        }
    },

    handleItemAction: function (index, eventKey) {
        let value = this.props.value;
        switch (eventKey) {
            case "remove":
                value.splice(index, 1);
                break;
            case 'moveUp':
                arrayHelper.move(value, index, index - 1);
                break;
            case 'moveDown':
                arrayHelper.move(value, index, index + 1);
                break;
            case 'moveFirst':
                arrayHelper.move(value, index, 0);
                break;
            case 'moveLast':
                arrayHelper.move(value, index, value.length - 1);
                break;
        }
        if (this.props.onChange) {
            this.props.onChange({id: this.props.id, value: value});
        }
    },

    render: function () {

        var header = this.props.displayName ?
            <header className="metaform-group-header no-lateral-margin">
                <span>{this.props.displayName}</span>
            </header>
            : null;

        let components = this.props.fields.map((fields, index) => {
            return <ArrayContainerItem index={index} onAction={this.handleItemAction}>
                {
                    this.props.componentFactory.buildGroupComponent({
                        component: this.props.layout.component,
                        layout: this.props.layout,
                        fields: fields,
                        componentFactory: this.props.componentFactory
                    })
                }
            </ArrayContainerItem>;
        });

        return (
            <div className="array-container">
                {header}
                <div className="array-container-content">
                    {components}
                </div>
                <div className="">
                    <span className="pull-right">
                        <GlyphButton glyph="plus" text={this.props.addText ? this.props.addText : "Add" }
                                     onClick={this.handleAdd} bsSize="small"/>
                    </span>
                </div>
            </div>
        );
    }
});

export default ArrayContainer;