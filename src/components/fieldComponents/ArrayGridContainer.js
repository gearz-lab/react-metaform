import React from 'react';
import metadataProvider from '../../lib/metadataProvider.js';
import MetaFormGroup from '../groupComponents/MetaFormGroup.js';
import GlyphButton from '../GlyphButton.js';
import Glyphicon from 'react-bootstrap/lib/Glyphicon.js';
import DropdownButton from 'react-bootstrap/lib/DropdownButton.js';
import MenuItem from 'react-bootstrap/lib/MenuItem.js';
import Dropdown from 'react-bootstrap/lib/Dropdown.js';
import arrayHelper from'../../lib/helpers/arrayHelper.js';
import Modal from 'react-bootstrap/lib/Modal.js';
import Button from 'react-bootstrap/lib/Button.js';
import MetaForm from '../../MetaForm.js';
import Table from 'react-bootstrap/lib/Table.js';
import functionHelper from '../../lib/helpers/functionHelper.js';
import _ from 'underscore';

const MetaFormModal = React.createClass({

    propTypes: {
        schema: React.PropTypes.object.isRequired,
        componentFactory: React.PropTypes.object.isRequired,
        model: React.PropTypes.object.isRequired,
        entityType: React.PropTypes.string.isRequired,
        layoutName: React.PropTypes.string.isRequired,
        onSave: React.PropTypes.function,
        onCancel: React.PropTypes.function
    },

    handleSave: function (model) {
        if (this.props.onSave) {
            this.props.onSave(model);
        }
    },

    handleCancel: function () {
        if (this.props.onCancel) {
            this.props.onCancel();
        }
    },

    getDefaultProps: function () {
        return {
            show: false
        }
    },

    render: function () {
        return <Modal show={this.props.show} bsSize="large">
            <Modal.Header>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <MetaForm
                    schema={this.props.schema}
                    ref="mf"
                    entityName={this.props.entityType}
                    layoutName={this.props.layoutName}
                    componentFactory={this.props.componentFactory}
                    model={this.props.model}
                    onSave={this.handleSave}
                    onCancel={this.handleCancel}
                    />
            </Modal.Body>
        </Modal>
    }
});

const ArrayGridRow = React.createClass({

    propTypes: {
        index: React.PropTypes.number.isRequired,
        onAction: React.PropTypes.func
    },

    handleAction: function (e, eventKey) {
        if (this.props.onAction) {
            this.props.onAction(this.props.index, eventKey)
        }
    },

    render: function () {
        return <tr className="array-container-item">
            <td>
                {this.props.children}
            </td>
            <td>
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
            </td>
        </tr>;
    }
});

const ArrayGrid = React.createClass({

    handleItemAction: function (index, eventKey) {
        if(this.props.onItemAction) {
            this.props.onItemAction(index, eventKey);
        }
    },

    render: function () {


        let rows = this.props.items.map((item, index) => {
            return <ArrayGridRow index={index} onAction={this.handleItemAction}>
                    {item.text}
                </ArrayGridRow>;
        });

        return <Table>
            <thead>
            <tr>
                <th>
                    Item
                </th>
                <th>
                    Actions
                </th>
            </tr>
            </thead>
            <tbody>
            {rows}
            </tbody>
        </Table>;
    }
});

const ArrayGridContainer = React.createClass({

    propTypes: {
        name: React.PropTypes.string.isRequired,
        componentFactory: React.PropTypes.object.isRequired,
        entityType: React.PropTypes.string.isRequired,
        layoutName: React.PropTypes.string,
        _itemDisplayName: React
    },

    getInitialState: () => {
        return {
            showModal: false
        }
    },

    handleAdd: function () {
        let newState = _.extend({}, this.state);
        newState.showModal = true;
        this.setState(newState);
    },

    handleAddSaved: function (model) {
        if (this.props.onChange) {
            let value = this.props.value;
            value.push(model);
            this.props.onChange({id: this.props.id, value: value});
        }
    },

    handleAddCanceled: function () {
        let newState = _.extend({}, this.state);
        newState.showModal = false;
        this.setState(newState);
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

        let items;
        if (this.props._itemDisplayName) {
            let itemDisplayNameFunction = functionHelper.getFunction(this.props._itemDisplayName);
            items = this.props.value.map(i => {
                return {
                    text: itemDisplayNameFunction(i)
                };
            });
        }
        else {
            items = this.props.value.map(i => {
                return {
                    text: i.toString()
                };
            });
        }

        return (
            <div className="array-container">
                {header}
                <div className="array-container-content">
                    <ArrayGrid items={items} onItemAction={this.handleItemAction} />
                </div>
                <div className="">
                    <span className="pull-right">
                        <GlyphButton glyph="plus" text={this.props.addText ? this.props.addText : "Add" }
                                     onClick={this.handleAdd} bsSize="small"/>
                    </span>
                </div>
                <MetaFormModal
                    show={this.state.showModal}
                    schema={this.props.schema}
                    componentFactory={this.props.componentFactory}
                    model={{}}
                    entityType={this.props.entityType}
                    layoutName={this.props.layoutName}
                    onSave={this.handleAddSaved}
                    onCancel={this.handleAddCanceled}
                    />
            </div>
        );
    }
});

export default ArrayGridContainer;