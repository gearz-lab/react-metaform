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
        let fields = metadataProvider.getFields(this.schema, entityAndLayout.entity, entityAndLayout.layout);
        let componentProps = this.getComponentProps(fields, this.model);

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

        if (typeProcessed.valid) {
            // the user input is valid for it's type

            // update the model
            objectHelper.setValue(newState.model, modelFieldKey, typeProcessed.convertedValue);

            // recalculate the componentProps for all components
            newState.componentProps = this.getComponentProps(newState.fields, newState.model);

            // set the raw value for the modified component
            objectHelper.setValue(newState.componentProps, `${componentPropsFieldKey}.rawValue`, newValue);

            // set the validation messages
            newState.validationSummary.messages = MetaFormStateManager.getValidationSummaryMessages(newState.componentProps);
        }
        else {
            // the user input is not valid for it's type.
            // in this case, there's no need to update the model neither to reprocess all
            // the componentProps
            objectHelper.setValue(newState.componentProps, `${componentPropsFieldKey}.rawValue`, newValue);
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
    getComponentProps(fields, model) {
        // will evaluate all the fields and return an array.
        // evaluation means converting every function, for instance, in actual values.
        let processedFields = metadataEvaluator.evaluate(fields, model);
        let processField = null;
        let _this = this;

        processField = (field, prefix) => {
            field.onChange = e => _this.updateState(field, e.value);
            if (!field.hasOwnProperty('value')) {
                field.value = dataEvaluator.evaluate(field, model);
            }

            if (field.type == 'entity') {
                let newPrefix = prefix ? `${prefix}.${field.name}` : field.name;
                field.componentProps = collectionHelper.toObject(field.fields.map(f => processField(f, newPrefix)));
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

    /**
     * Updates de componentProps
     * @param model
     */
    updateComponentProps(model) {
        let newState = _.extend({}, this.getState());
        newState.componentProps = this.getComponentProps(newState.fields, model);
        this.setState(newState);
    }
}

export default MetaFormStateManager;