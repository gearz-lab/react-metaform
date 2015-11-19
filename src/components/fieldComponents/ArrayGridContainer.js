import React from 'react';
import Alert from 'react-bootstrap/lib/Alert.js';
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
import FormGroup from './FormGroup.js';
import functionHelper from '../../lib/helpers/functionHelper.js';
import _ from 'underscore';

const MetaFormModal = React.createClass({

    propTypes: {
        schema: React.PropTypes.object.isRequired,
        componentFactory: React.PropTypes.object.isRequired,
        model: React.PropTypes.object.isRequired,
        entityType: React.PropTypes.string.isRequired,
        layoutName: React.PropTypes.string.isRequired,
        onSave: React.PropTypes.func,
        onCancel: React.PropTypes.func
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
            <td className="col-md-11">
                {this.props.children}
            </td>
            <td className="col-md-1">
                <Dropdown pullRight onSelect={this.handleAction}>
                    <Dropdown.Toggle noCaret>
                        <Glyphicon glyph="cog"/>
                    </Dropdown.Toggle>
                    <Dropdown.Menu >
                        <MenuItem eventKey="edit"><Glyphicon glyph="pencil"/>
                            <span className="glyphicon-text">Edit</span>
                        </MenuItem>
                        <MenuItem eventKey="remove"><Glyphicon glyph="remove" className="text-danger"/><span
                            className="glyphicon-text text-danger">Remove</span>
                        </MenuItem>
                        <MenuItem divider/>
                        <MenuItem eventKey="moveUp"><Glyphicon glyph="chevron-up"/>
                            <span className="glyphicon-text">Move up</span>
                        </MenuItem>
                        <MenuItem eventKey="moveDown"><Glyphicon glyph="chevron-down"/><span
                            className="glyphicon-text">Move down</span>
                        </MenuItem>
                        <MenuItem divider/>
                        <MenuItem eventKey="moveFirst"><Glyphicon glyph="chevron-up"/><span
                            className="glyphicon-text">Move first</span>
                        </MenuItem>
                        <MenuItem eventKey="moveLast"><Glyphicon glyph="chevron-down"/><span
                            className="glyphicon-text">Move last</span>
                        </MenuItem>
                    </Dropdown.Menu>
                </Dropdown>
            </td>
        </tr>;
    }
});

const ArrayGrid = React.createClass({

    handleItemAction: function (index, eventKey) {
        if (this.props.onItemAction) {
            this.props.onItemAction(index, eventKey);
        }
    },

    render: function () {


        let rows = this.props.items.map((item, index) => {
            return <ArrayGridRow index={index} onAction={this.handleItemAction}>
                {item.text}
            </ArrayGridRow>;
        });

        return <Table bordered condensed>
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
            editingItemIndex: null
        }
    },

    handleAdd: function () {
        let newState = _.extend({}, this.state);
        newState.editingItemIndex = -1;
        this.setState(newState);

        // This "return false" is so a "#" doesn't get added to the URL when this method is triggered from a "a" element.
        return false;
    },

    handleSaveItem: function (model) {
        if (this.props.onChange) {
            let value = this.props.value;

            if(!this.state.editingItemIndex === null || this.state.editingItemIndex === undefined) {
                // I'm not sure if an exception should be thrown here. It should probably be. However, there could
                // be a situation that could change it. Needs further analysis.
                return;
            }
            else if(this.state.editingItemIndex == -1) {
                value.push(model);
            }
            else {
                value[this.state.editingItemIndex] = model;
            }

            this.props.onChange({id: this.props.id, value: value});
            this.handleModalClose();
        }
    },

    handleModalClose: function () {
        let newState = _.extend({}, this.state);
        newState.editingItemIndex = null;
        this.setState(newState);
    },

    handleItemAction: function (index, eventKey) {
        let value = this.props.value;

        if (eventKey == "edit") {
            let newState = _.extend({}, this.state);
            newState.editingItemIndex = index;
            this.setState(newState);
            return;
        }

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

        let showModal = this.state.editingItemIndex != null && this.state.editingItemIndex != undefined;
        let modalModel;
        if (this.state.editingItemIndex == -1) {
            modalModel = {}
        }
        else if (this.state.editingItemIndex >= 0) {
            modalModel = this.props.value[this.state.editingItemIndex];
        }
        else {
            modalModel = null;
        }

        return (
            <div className="array-grid-container">
                <FormGroup displayName={this.props.displayName}>
                    {items.length
                        ? <ArrayGrid items={items} onItemAction={this.handleItemAction}/>
                        : <Alert bsStyle="warning">
                        This array is empty. Consider <a href="#" onClick={this.handleAdd}>adding a new item</a>.
                    </Alert>}

                </FormGroup>
                <div className="">
                    <span className="pull-right">
                        <GlyphButton glyph="plus" text={this.props.addText ? this.props.addText : "Add" }
                                     onClick={this.handleAdd} />
                    </span>
                </div>
                <MetaFormModal
                    show={showModal}
                    schema={this.props.schema}
                    componentFactory={this.props.componentFactory}
                    model={modalModel}
                    entityType={this.props.entityType}
                    layoutName={this.props.layoutName}
                    onSave={this.handleSaveItem}
                    onCancel={this.handleModalClose}
                    />
            </div>
        );
    }
});

export default ArrayGridContainer;