import expressionEvaluator from './ExpressionEvaluator.js';

// metadata filters
import defaultMetadataFilter from './metadataEvaluatorFilters/defaultMetadataFilter.js';
import entityMetadataFilter from './metadataEvaluatorFilters/entityMetadataFilter.js';
import arrayMetadataFilter from './metadataEvaluatorFilters/arrayMetadataFilter.js';
import valueSetterMetadataFilter from './metadataEvaluatorFilters/valueSetterMetadataFilter.js';
import onChangeSetterMetadataFilter from './metadataEvaluatorFilters/onChangeSetterMetadataFilter.js';

// property filters
import defaultPropertyMetadataFilter from './metadataEvaluatorPropertyFilters/defaultMetadataPropertyFilter.js';
import conditionMessagePropertyFilter from './metadataEvaluatorPropertyFilters/conditionMessagePropertyFilter.js';
import _ from 'underscore';

class MetadataEvaluator {

    constructor() {
        // this array contains objects like: { property: 'invalid', filter: filter }
        // metadataPropertyFilters that don't have a property associated will act on all properties
        // in the order they were registered
        this.metadataPropertyFilters = [];
        // this array contains metadata filters
        this.metadataFilters = [];
    }

    /**
     * Evaluates the given expression against the model
     * @param expression
     * @param model
     * @private
     */
    _evaluateExpression(expression, model){
        return expressionEvaluator.evaluate(expression, model);
    }

    /**
     * Evaluates the given metadata against the model
     * @param metadata - Can be either an object or an array of objects
     * @param model
     * @returns {{}}
     */
    evaluate(metadata, model, keyPrefix, metadataIndex, onChange) {

        if(!metadata) {
            throw Error('metadata parameter is required');
        }
        if(metadata.constructor === Array) {
            return metadata.map(i => this.evaluate(i, model, keyPrefix, metadataIndex, onChange));
        }
        if(!metadataIndex) {
            metadataIndex = {};
        }

        let result = {};
        for (var propertyName in metadata) {
            if (metadata.hasOwnProperty(propertyName)) {
                result[propertyName] = this.filterProperty(propertyName, metadata[propertyName], model);
            }
        }

        // experimenting setting the value property of each metadata
        let newPrefix = keyPrefix ? `${keyPrefix}.${metadata.name}` : metadata.name;
        // key is a special prop in React, so it knows 'what' component this is
        result.key = newPrefix;
        // because key is inaccessible from a React component, we need to replicate it into an 'id' prop
        result.id = result.key;

        // populates de index
        metadataIndex[result.key] = result;

        return this.filter(result, model, newPrefix, metadataIndex, onChange);
    }

    /**
     * Adds the given filter
     * @param filter
     */
    addFilter(filter) {
        if(!filter) {
            throw new Error('filter is required');
        }
        this.metadataFilters.push(filter);
    }

    /**
     * Adds the given filter for the given metadata property name
     * @param metadataProperty
     * @param filter
     */
    addPropertyFilter(filter, metadataProperty) {
        if(!filter) {
            throw new Error('filter is required');
        }
        this.metadataPropertyFilters.push({ property: metadataProperty, filter: filter });
    }

    /**
     * Filters the given property against the model
     * @param propertyName
     * @param propertyValue
     * @param model
     */
    filterProperty(propertyName, propertyValue, model) {
        let processedMetadataProperty = propertyValue;
        for(let i=0; i < this.metadataPropertyFilters.length; i++) {
            if(!this.metadataPropertyFilters[i].property || this.metadataPropertyFilters[i].property === propertyName) {
                processedMetadataProperty = this.metadataPropertyFilters[i].filter.filter(processedMetadataProperty, model);
            }
        }
        return processedMetadataProperty;
    }

    /**
     * Filters the given metadata against the model
     * @param metadata
     * @param model
     * @returns {*}
     */
    filter(metadata, model, keyPrefix, metadataIndex, onChange) {
        let processedMetadata = metadata;
        for(let i=0; i<this.metadataFilters.length; i++) {
            processedMetadata = this.metadataFilters[i].filter(processedMetadata, model, keyPrefix, this, metadataIndex, onChange);
        }
        return processedMetadata;
    }

    /**
     * Evaluates the field metadata against the model
     * @param metadata
     * @param model
     */
    evaluateProperty(metadata, model) {

        let evaluateMetadataObject = (metadata, model) => {

            if (metadata.expression && metadata.expressionText) {
                throw new Error('Metadata cannot define both expression and expressionText')
            }

            if (metadata.expression) {
                if(!(typeof(metadata.expression) === 'function')) {
                    throw new Error(`Error evaluating expression. Expression should be a function. Expression is of type: ${typeof metadata.expression}`);
                }
            }

            if (metadata.expressionText) {
                if(!(typeof(metadata.expressionText) === 'string')) {
                    throw new Error(`Error evaluating ExpressionText. ExpressionText should be a string representing a function. ExpressionText is of type: ${typeof metadata.expressionText}`);
                }
            }

            let expression = metadata.expression ? metadata.expression : metadata.expressionText;
            let evaluation = {value: this._evaluateExpression(expression, model)};
            _.extend(evaluation, metadata);

            delete evaluation.expression;
            delete evaluation.expressionText;

            return evaluation;
        };

        if(metadata instanceof Array) {
            let result = [];
            metadata.forEach(item => {
                result.push(evaluateMetadataObject(item, model));
            });
            return result;
        }
        else if(metadata instanceof Object) {
            let result = [];
            result.push(evaluateMetadataObject(metadata, model));
            return result;
        }
        else {
            return [{ value: metadata }];
        }
    }

    /**
     * Returns whether or not the given property exists in the given metadata
     * @param metadata
     * @param property
     * @returns {*|boolean}
     */
    exists(metadata, property) {
        return metadata && metadata.hasOwnProperty(property);
    }

}

let metadataEvaluator = new MetadataEvaluator();

// register metadata filters
metadataEvaluator.addFilter(defaultMetadataFilter);
metadataEvaluator.addFilter(entityMetadataFilter);
metadataEvaluator.addFilter(arrayMetadataFilter);
metadataEvaluator.addFilter(valueSetterMetadataFilter);
metadataEvaluator.addFilter(onChangeSetterMetadataFilter);

// register property filters
metadataEvaluator.addPropertyFilter(defaultPropertyMetadataFilter);
metadataEvaluator.addPropertyFilter(conditionMessagePropertyFilter, 'invalid');


export default metadataEvaluator;
