import React from 'react';
import _ from 'underscore';
import Alert from 'react-bootstrap/lib/Alert.js';
import Lookup from '../fieldComponents/Lookup.js';
import Button from 'react-bootstrap/lib/Button.js';
import Glyphicon from 'react-bootstrap/lib/Glyphicon.js';

var SelectiveMetaFormGroup = React.createClass({
    propTypes: {
        component: React.PropTypes.string,
        layout: React.PropTypes.object.isRequired,
        fields: React.PropTypes.array.isRequired,
        componentFactory: React.PropTypes.object.isRequired
    },
    getInitialState: function () {
        return {
            selectedFields: []
        }
    },

    handleAddField: function () {
        let updatedState = React.addons.update(this.state, {selectedFields: {$push: [{fieldName: undefined}]}});
        this.setState(updatedState);
    },

    handleRemoveField: function (index) {
        let updatedState = _.extend({}, this.state);
        updatedState.selectedFields.splice(index, 1);
        this.setState(updatedState);
    },

    handleSelectField: function (index, event, components) {
        let updatedState = _.extend({}, this.state);
        updatedState.selectedFields[index].fieldName = event.value;
        this.setState(updatedState);
    },

    getFieldOptions: function (components, currentlySelected) {
        let allComponents = components.map(c => ({value: c.data.name, text: c.data.displayName}));
        let selectedComponents = this.state.selectedFields.map(f => f.fieldName);
        return _.reject(allComponents, c => c.value != currentlySelected && _.contains(selectedComponents, c.value));
    },

    getComponentForFieldName: function (fieldName, components) {
        let component = _.find(components, c => c.data.name == fieldName);
        if (component) {
            return component.component;
        }
        return null;
    },

    render: function () {

        try {
            if (this.props.layout.groups && this.props.layout.groups.length) {
                throw Error('The SelectiveMetaFormGroup cannot be applied to groups that have groups');
            }
            let components = this.props.layout.fields.map(field => {
                let layoutFieldInProps = _.find(this.props.fields, cp => cp.name === field.name);
                return {
                    data: layoutFieldInProps,
                    component: this.props.componentFactory.buildFieldComponent(layoutFieldInProps)
                }
            });
            return <div className="selective-metaform-group">
                {
                    this.state.selectedFields.map((f, i) => {
                        return <div className="selective-metaform-group-item">
                            <div className="row">
                                <div className="col-md-1">
                                    <div className="selective-metaform-group-item-actions">
                                        <Button onClick={() => this.handleRemoveField(i)}>
                                            <Glyphicon glyph="minus"/>
                                        </Button>
                                    </div>
                                </div>
                                <div className="col-md-11">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Lookup name="field" displayName="Field"
                                                    onChange={(event) => this.handleSelectField(i, event, components)}
                                                    value={f.fieldName}
                                                    options={
                                                this.getFieldOptions(components, f.fieldName)
                                             }/>
                                        </div>
                                        <div
                                            className="col-md-6">
                                            {  this.getComponentForFieldName(f.fieldName, components)  }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })
                }
                <div className="add-field-section">
                    <div className="row">
                        <div className="col-md-2">
                            <div className="selective-metaform-group-actions">
                                <Button onClick={this.handleAddField}>
                                    <Glyphicon glyph="plus"/>
                                </Button>
                            </div>
                        </div>
                        <div className="col-md-10"></div>
                    </div>
                </div>
            </div>
        }
        catch (ex) {
            return <Alert bsStyle='danger'>
                <h4>Oh snap! The schema is not valid.</h4>

                <p>Detailed information:
                    <b>{ex}</b>
                </p>
            </Alert>;
        }
    }
});

export default SelectiveMetaFormGroup;