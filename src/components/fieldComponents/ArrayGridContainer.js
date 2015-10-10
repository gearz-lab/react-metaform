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

    handleSave: function(model) {
        if(this.props.onSave) {
            this.props.onSave(model);
        }
    },

    handleCancel: function() {
        if(this.props.onCancel) {
            this.props.onCancel();
        }
    },

    getDefaultProps: function() {
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

const ArrayGridContainer = React.createClass({

    propTypes: {
        name: React.PropTypes.string.isRequired,
        componentFactory: React.PropTypes.object.isRequired,
        entityType: React.PropTypes.string.isRequired,
        layoutName: React.PropTypes.string
    },

    getInitialState: () => {
        return {
            showModal: false
        }
    },

    handleAdd: function() {
        let newState = _.extend({}, this.state);
        newState.showModal = true;
        this.setState(newState);
    },

    handleAddSaved: function(model) {
        if (this.props.onChange) {
            let value = this.props.value;
            value.push(model);
            this.props.onChange({id: this.props.id, value: value});
        }
    },

    handleAddCanceled: function() {
        let newState = _.extend({}, this.state);
        newState.showModal = false;
        this.setState(newState);
    },

    render: function () {

        var header = this.props.displayName ?
            <header className="metaform-group-header no-lateral-margin">
                <span>{this.props.displayName}</span>
            </header>
            : null;

        let components = this.props.fields.map((fields, index) => {
            return <ArrayGridContainer index={index} onSelect={this.handleItemAction}>
                {
                    this.props.componentFactory.buildGroupComponent({
                        component: this.props.layout.component,
                        layout: this.props.layout,
                        fields: fields,
                        componentFactory: this.props.componentFactory
                    })
                }
            </ArrayGridContainer>;
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