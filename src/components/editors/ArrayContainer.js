import React from 'react';
import metadataProvider from '../../lib/metadataProvider.js';
import MetaFormGroup from '../MetaFormGroup.js';
import GlyphButton from '../GlyphButton.js';
import Glyphicon from 'react-bootstrap/lib/Glyphicon.js';
import DropdownButton from 'react-bootstrap/lib/DropdownButton.js';
import MenuItem from 'react-bootstrap/lib/MenuItem.js';
import Dropdown from 'react-bootstrap/lib/Dropdown.js';

const ArrayContainerItem = React.createClass({
    render: function () {

        return <div className="row">
            <div className="col-md-11">
                {this.props.children}
            </div>
            <div className="col-md-1">
    <Dropdown pullRight>
        <Dropdown.Toggle noCaret bsSize="small">
            <Glyphicon glyph="cog" />
        </Dropdown.Toggle>
        <Dropdown.Menu pullLeft>
            <MenuItem eventKey="1"><Glyphicon glyph="remove" className="text-danger"/><span className="glyphicon-text text-danger">Remove</span></MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="2"><Glyphicon glyph="menu-up"/><span className="glyphicon-text">Move up</span></MenuItem>
            <MenuItem eventKey="3"><Glyphicon glyph="menu-down"/><span className="glyphicon-text">Move down</span></MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="4"><Glyphicon glyph="menu-up"/><span className="glyphicon-text">Move first</span></MenuItem>
            <MenuItem eventKey="5"><Glyphicon glyph="menu-down"/><span className="glyphicon-text">Move last</span></MenuItem>
        </Dropdown.Menu>
    </Dropdown>
            </div>
        </div>;

        //return <div className="collection-container-item">
        //    <div className="collection-container-remove-item-wrap">
        //        <Dropdown>
        //            <Dropdown.Toggle noCaret bsStyle="link">
        //                <Glyphicon glyph="cog" />
        //            </Dropdown.Toggle>
        //            <Dropdown.Menu>
        //                <MenuItem eventKey="1">Action</MenuItem>
        //                <MenuItem eventKey="2">Another action</MenuItem>
        //                <MenuItem eventKey="3">Something else here</MenuItem>
        //                <MenuItem divider />
        //                <MenuItem eventKey="4">Separated link</MenuItem>
        //            </Dropdown.Menu>
        //        </Dropdown>
        //    </div>
        //    <div className="collection-container-array-item-wrap">
        //        {this.props.children}
        //    </div>
        //</div>;
    }
});

const ArrayContainer = React.createClass({

    propTypes: {
        name: React.PropTypes.string.isRequired
    },

    handleAdd: function() {
        if(this.props.onChange) {
            let value = this.props.value;
            value.push({});
            this.props.onChange({id: this.props.id, value: value});
        }
    },

    render: function () {

        let components = this.props.fields.map(f => {
            return <ArrayContainerItem>
                    <MetaFormGroup layout={this.props.layout} fields={f}/>
                </ArrayContainerItem>;
        });

        return (
            <div>
                {components}
                <div className="">
                    <span className="pull-right">
                        <GlyphButton glyph="plus" text="Add" onClick={this.handleAdd} bsSize="small" />
                    </span>
                </div>
            </div>
        );
    }
});

export default ArrayContainer;