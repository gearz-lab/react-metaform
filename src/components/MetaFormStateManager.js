import _ from 'underscore';
import metadataEvaluator from '../lib/MetadataEvaluator.js';
import metadataProvider from '../lib/metadataProvider.js';
import dataEvaluator from '../lib/DataEvaluator.js';
import collectionHelper from './../lib/helpers/collectionHelper.js';
import objectHelper from '../lib/helpers/objectHelper.js';
import typeProcessorFactory from '../lib/typeProcessorFactory.js';

class MetaFormStateManager {

    /**
     *
     * @param schema
     * @param entityName
     * @param layoutName
     * @param model
     * @param stateGetter
     * @param stateSetter
     * @param onModelChange
     */
    constructor(schema, entityName, layoutName, model, stateGetter, stateSetter, onModelChange, componentFactory) {
        this.schema = schema;
        this.entityName = entityName;
        this.layoutName = layoutName;
        this.model = model;
        this.stateGetter = stateGetter;
        this.stateSetter = stateSetter;
        this.metadataIndex = {};
        this.onModelChange = onModelChange;

        this.entityAndLayout = metadataProvider.getEntityAndLayout(this.schema, this.entityName, this.layoutName);
        this.fields = metadataProvider.getFields(this.schema, this.entityAndLayout.entity, this.entityAndLayout.layout, f => {
            f.componentFactory = componentFactory;
            f.schema = schema;
        });
    }

    getState() {
        return this.stateGetter();
    }

    setState(state) {
        this.stateSetter(state);
    }

    /**
     * Gets the initial state
     * @returns {{validationSummary: {open: boolean, messages: (*|Array)}, fields: *, entity: entity, layout: layout, model: *, componentProps: Object}}
     */
    getInitialState() {
        return {
            entity: this.entityAndLayout.entity, // this seems useless
            layout: this.entityAndLayout.layout, // this seems useless
            model: this.model,
            // object with a key for each property
            componentProps: this.getComponentProps(this.model),
            validationSummary: {
                open: false,
                messages: this.getValidationSummaryMessages()
            }
        }
    }

    /**
     * Updates de model and the componentProps for the new value
     * @param id
     * @param newValue
     */
    updateState(id, newValue) {
        let newState = _.extend({}, this.getState());
        let fieldMetadata = this.metadataIndex[id];
        if (!fieldMetadata) {
            throw Error(`could not find metadata for the given field. Field: ${id}`);
        }
        let typeProcessorType = typeProcessorFactory.getProcessorType(fieldMetadata.type);
        let typeProcessor = new typeProcessorType();
        let typeProcessed = typeProcessor.process(newValue);

        //let modelFieldKey = fieldMetadata.key;
        //let componentPropsFieldKey = modelFieldKey.indexOf('.') == -1 ? modelFieldKey : modelFieldKey.split('.').join('.componentProps.');

        if (typeProcessed.valid) {
            // the user input is valid for it's type

            // update the model
            objectHelper.setValue(newState.model, id, typeProcessed.convertedValue);

            // recalculate the componentProps for all components
            newState.componentProps = this.getComponentProps(newState.model);

            if (this.onModelChange) {
                this.onModelChange(newState.model);
            }
        }
        else {
            // the user input is not valid for it's type.
            // in this case, there's no need to update the model neither to reprocess all
            // the componentProps
            fieldMetadata.invalid = {
                value: true,
                message: `The field '${id}' should be a valid ${fieldMetadata.type}.`
            };
        }
        // set the raw value for the modified component
        fieldMetadata.rawValue = newValue;
        // set the validation messages
        newState.validationSummary.messages = this.getValidationSummaryMessages();

        this.setState(newState);
    }


    /**
     * Returns a validation summary for the given componentProps
     * @param componentProps
     * @returns {Array}
     */
    getValidationSummaryMessages() {
        let result = [];
        for (let key in this.metadataIndex) {
            if (this.metadataIndex.hasOwnProperty(key)) {
                if (this.metadataIndex[key].invalid && this.metadataIndex[key].invalid.value == true) {
                    result.push(this.metadataIndex[key].invalid.message);
                }
            }
        }
        return result;
    }

    /**
     * Returns an object with a property for each given field metadata. The value is the metadata already
     * processed for the given model
     * @param fields
     * @param model
     * @returns {Object}
     * @private
     */
    getComponentProps(model) {
        // this method has a side effect of populating the this.metadataIndex. This should be fixed
        return metadataEvaluator.evaluate(this.fields, model, '', this.metadataIndex, (e) => this.updateState(e.id, e.value));
    }

    /**
     * Updates de componentProps
     * @param model
     */
    updateComponentProps(model) {
        let newState = _.extend({}, this.getState());
        newState.componentProps = this.getComponentProps(model);
        this.setState(newState);
    }
}

export default MetaFormStateManager;