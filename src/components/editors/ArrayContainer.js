import React from 'react';
import metadataProvider from '../../lib/metadataProvider.js';
import MetaFormGroup from '../MetaFormGroup.js';
import GlyphButton from '../GlyphButton.js';
import Glyphicon from 'react-bootstrap/lib/Glyphicon.js';
import DropdownButton from 'react-bootstrap/lib/DropdownButton.js';
import MenuItem from 'react-bootstrap/lib/MenuItem.js';
import Dropdown from 'react-bootstrap/lib/Dropdown.js';
import arrayHelper from'../../lib/helpers/arrayHelper.js';

const ArrayContainerItem = React.createClass({

    propTypes: {
        index: React.PropTypes.number,
        onSelect: React.PropTypes.func
    },

    handleAction: function (e, eventKey) {
        if (this.props.onSelect) {
            this.props.onSelect(this.props.index, eventKey)
        }
    },

    render: function () {

        return <div className="row">
            <div className="col-md-11">
                {this.props.children}
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
                        <MenuItem eventKey="moveDown"><Glyphicon glyph="chevron-down"/><span className="glyphicon-text">Move down</span></MenuItem>
                        <MenuItem divider/>
                        <MenuItem eventKey="moveFirst"><Glyphicon glyph="chevron-up"/><span className="glyphicon-text">Move first</span></MenuItem>
                        <MenuItem eventKey="moveLast"><Glyphicon glyph="chevron-down"/><span className="glyphicon-text">Move last</span></MenuItem>
                    </Dropdown.Menu>
                </Dropdown>
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

    handleItemAction: function(index, eventKey) {
        let value = this.props.value;
        switch(eventKey) {
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
            <header className="meta-form-entity-title"><span>{this.props.displayName}</span></header>
            : null;

        let components = this.props.fields.map((fields, index) => {
            return <ArrayContainerItem index={index} onSelect={this.handleItemAction} >
                <MetaFormGroup layout={this.props.layout} fields={fields} />
            </ArrayContainerItem>;
        });

        return (
            <div>
                {header}
                {components}
                <div className="">
                    <span className="pull-right">
                        <GlyphButton glyph="plus" text="Add" onClick={this.handleAdd} bsSize="small"/>
                    </span>
                </div>
            </div>
        );
    }
});

export default ArrayContainer;