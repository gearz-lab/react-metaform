import React from 'react';
import MetaFormGroup from './MetaFormGroup.js';
import metadataEvaluator from '../lib/MetadataEvaluator.js';
import metadataProvider from '../lib/metadataProvider.js';
import dataEvaluator from '../lib/DataEvaluator.js';
import collectionHelper from '../lib/helpers/collectionHelper.js';
import typeProcessorFactory from '../lib/typeProcessorFactory.js';
import Button from 'react-bootstrap/lib/Button.js';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar.js';
import ValidationSummary from './ValidationSummary.js';
import _ from 'underscore';

var MetaForm = React.createClass({

    propTypes: {
        title: React.PropTypes.string,
        schema: React.PropTypes.object.isRequired,
        entityName: React.PropTypes.string.isRequired,
        layoutName: React.PropTypes.string.isRequired,
        fields: React.PropTypes.object,
        model: React.PropTypes.object,
        showBottomBar: React.PropTypes.bool,
        // the onSave handler receives the model as a parameter
        onSave: React.PropTypes.func
    },

    getInitialState: function() {
        let model = this.props.model ? this.props.model : {};

        let entityAndLayout = metadataProvider.getEntityAndLayout(this.props.schema, this.props.entityName, this.props.layoutName);
        let fields = metadataProvider.getFields(this.props.schema, this.props.entityName, this.props.layoutName);

        let componentProps = this.getComponentProps(fields, model);

        return {
            validationSummary: {
                open: false,
                messages: this.getValidationSummaryMessages(componentProps)
            },
            fields: fields,
            entity: entityAndLayout.entity,
            layout: entityAndLayout.layout,
            model: model,
            // object with a key for each property
            componentProps: componentProps
        }
    },

    resetState: function(){
        this.replaceState(this.getInitialState());
    },

    /**
     *
     * @param metadata
     * @param model
     */
    postProcessComponentProps: function(componentProps, property, rawValue) {

    },

    /**
     * Returns a validation summary for the given componentProps
     * @param componentProps
     * @returns {Array}
     */
    getValidationSummaryMessages: function(componentProps) {
        let result = [];
        for(let key in componentProps) {
            if(componentProps.hasOwnProperty(key)) {
                if(componentProps[key].invalid && componentProps[key].invalid.value == true) {
                    result.push(componentProps[key].invalid.message);
                }
            }
        }
        return result;
    },

    /**
     * Returns an object with a property for each given field metadata. The value is the metadata already
     * processed for the given model
     * @param fields
     * @param model
     * @returns {Object}
     * @private
     */
    getComponentProps: function(fields, model) {
        // will evaluate all the fields and return an array
        let processedFields = metadataEvaluator.evaluate(fields, model);
        let _this = this;
        let processField = null;

        processField = (field) => {
            field.onChange = e => _this.updateState(field, e.value);
            if(!field.hasOwnProperty('value')) {
                field.value = dataEvaluator.evaluate(field, model);
            }
            if(field.fields) {
                field.componentProps = collectionHelper.toObject(field.fields.map(processField), 'name');
            }
            return field;
        };

        // the component props are basically the matadata found within the 'fields' array,
        // with some added properties. Let's add these properties.
        processedFields = processedFields.map( f => processField(f));

        // will convert the array into an object
        return collectionHelper.toObject(processedFields, 'name');
    },

    updateState: function(fieldMetadata, newValue) {
        let newState = _.extend({}, this.state);

        let typeProcessorType = typeProcessorFactory.getProcessorType(fieldMetadata.type);
        let typeProcessor = new typeProcessorType();
        let typeProcessed = typeProcessor.process(newValue);

        if(typeProcessed.valid) {
            // the user input is valid for it's type
            newState.model[fieldMetadata.name] = typeProcessed.convertedValue;
            newState.componentProps = this.getComponentProps(newState.fields, newState.model);
            newState.componentProps[fieldMetadata.name].rawValue = newValue;
            newState.validationSummary.messages = this.getValidationSummaryMessages(newState.componentProps);
        }
        else {
            // the user input is not valid for it's type.
            // in this case, there's no need to update the model neither to reprocess all
            // the componentProps
            newState.componentProps[fieldMetadata.name].rawValue = newValue;
            newState.componentProps[fieldMetadata.name].invalid = {
                value: true,
                message: `The field '${fieldMetadata.name}' should be a valid ${fieldMetadata.type}.`
            };
            newState.validationSummary.messages = this.getValidationSummaryMessages(newState.componentProps);
        }

        this.setState(newState);
    },

    handleValidationSummaryDismiss: function() {
        let newState = _.extend({}, this.state);
        newState.validationSummary.open = false;
        this.setState(newState);
    },

    /**
     * Handles the save button
     */
    handleSave() {
        if(this.state.validationSummary.messages.length) {
            // if the validation summary has any message, the 'save' button won't
            // do anything. Actually the 'handleSave' method shouldn't even
            // be called in this case, but anyways...
            return;
        }
        if(this.props.onSave) {
            this.props.onSave(this.state.model);
        }
    },

    render: function() {
        // the model is cloned for security reasons, to make it hard for the components to
        // interfere with the MetaForm model. It could even be cloned once per property,
        // but that would impact performance.
        let _this = this;

        let title = null;
        if(this.props.title) {
            title = <div>
                <h3>{_this.props.title}</h3>

            </div>;
        }

        let bottomBar = null;
        if(this.props.showBottomBar === undefined || this.props.showBottomBar === true) {
            bottomBar = <div>
                    <ValidationSummary open={_this.state.validationSummary.open} messages={_this.state.validationSummary.messages} onDismiss={_this.handleValidationSummaryDismiss} />
                    <div className='meta-form-bottom-bar'>
                        <ButtonToolbar className='pull-right'>
                            <Button bsStyle='danger' onClick={_this.handleSave}>Save</Button>
                            <Button>Cancel</Button>
                        </ButtonToolbar>
                    </div>
                </div>;
        }

        return (
            <div className="meta-form">
                {title}
                <MetaFormGroup layout={this.state.layout} componentProps={_this.state.componentProps} />
                {bottomBar}
            </div>
        );
    }
});

export default MetaForm;
