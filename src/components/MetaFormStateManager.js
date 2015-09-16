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
     */
    constructor(schema, entityName, layoutName, model, stateGetter, stateSetter) {
        this.schema = schema;
        this.entityName = entityName;
        this.layoutName = layoutName;
        this.model = model;
        this.stateGetter = stateGetter;
        this.stateSetter = stateSetter;
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
        let entityAndLayout = metadataProvider.getEntityAndLayout(this.schema, this.entityName, this.layoutName);
        let fields = metadataProvider.getFields(this.schema, this.entityName, this.layoutName);

        let preprocessFields = (fields) => {
            let preprocessField = (field) => {
                field.onChange = e => this.updateState(field, e.value);
                return field;
            };
            return fields.map(preprocessField);
        };

        fields = preprocessFields(fields);
        let componentProps = MetaFormStateManager.getComponentProps(fields, this.model, (f, v) => this.updateState(f, v));

        return {
            validationSummary: {
                open: false,
                messages: MetaFormStateManager.getValidationSummaryMessages(componentProps)
            },
            fields: fields,
            entity: entityAndLayout.entity,
            layout: entityAndLayout.layout,
            model: this.model,
            // object with a key for each property
            componentProps: componentProps
        }
    }

    /**
     * Updates de model and the componentProps for the new value
     * @param fieldMetadata
     * @param newValue
     */
    updateState(fieldMetadata, newValue) {
        let newState = _.extend({}, this.getState());

        let typeProcessorType = typeProcessorFactory.getProcessorType(fieldMetadata.type);
        let typeProcessor = new typeProcessorType();
        let typeProcessed = typeProcessor.process(newValue);

        let modelFieldKey = fieldMetadata.key;
        let componentPropsFieldKey = modelFieldKey.indexOf('.') == -1 ? modelFieldKey : modelFieldKey.split('.').join('.componentProps.');

        objectHelper.setValue(newState.componentProps, `${componentPropsFieldKey}.rawValue`, newValue);

        if (typeProcessed.valid) {
            // the user input is valid for it's type

            objectHelper.setValue(newState.model, modelFieldKey, typeProcessed.convertedValue);
            newState.componentProps = MetaFormStateManager.getComponentProps(newState.fields, newState.model, (f, v) => this.updateState(f, v));
            newState.validationSummary.messages = MetaFormStateManager.getValidationSummaryMessages(newState.componentProps);
        }
        else {
            // the user input is not valid for it's type.
            // in this case, there's no need to update the model neither to reprocess all
            // the componentProps
            objectHelper.setValue(newState.componentProps, `${componentPropsFieldKey}.invalid`, {
                value: true,
                message: `The field '${componentPropsFieldKey}' should be a valid ${fieldMetadata.type}.`
            });
            newState.validationSummary.messages = MetaFormStateManager.getValidationSummaryMessages(newState.componentProps);
        }

        this.setState(newState);
    }


    /**
     * Returns a validation summary for the given componentProps
     * @param componentProps
     * @returns {Array}
     */
    static getValidationSummaryMessages(componentProps) {
        let result = [];
        for (let key in componentProps) {
            if (componentProps.hasOwnProperty(key)) {
                if (componentProps[key].invalid && componentProps[key].invalid.value == true) {
                    result.push(componentProps[key].invalid.message);
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
    static getComponentProps(fields, model, updateState) {
        // will evaluate all the fields and return an array
        let processedFields = metadataEvaluator.evaluate(fields, model);
        let processField = null;

        processField = (field) => {
            field.onChange = e => updateState(field, e.value);
            if (!field.hasOwnProperty('value')) {
                field.value = dataEvaluator.evaluate(field, model);
            }

            if (field.type == 'entity') {
                field.componentProps = collectionHelper.toObject(field.fields.map(processField));
            }
            else if (field.type == 'array') {

            }
            return field;
        };

        // the component props are basically the matadata found within the 'fields' array,
        // with some added properties. Let's add these properties.
        processedFields = processedFields.map(f => processField(f));

        // will convert the array into an object
        return collectionHelper.toObject(processedFields, 'name');
    }
}

export default MetaFormStateManager;