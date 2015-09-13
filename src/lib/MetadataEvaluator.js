import expressionEvaluator from './ExpressionEvaluator.js';
import defaultMetadataFilter from './metadataFilters/defaultMetadataFilter.js';
import defaultPropertyMetadataFilter from './metadataPropertyFilters/defaultMetadataPropertyFilter.js';
import conditionMessagePropertyFilter from './metadataPropertyFilters/conditionMessagePropertyFilter.js';
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
    evaluate(metadata, model) {
        if(!metadata) {
            throw Error('metadata parameter is required');
        }
        if(metadata.constructor === Array) {
            return metadata.map(i => this.evaluate(i, model));
        }
        let result = {};
        for (var property in metadata) {
            if (metadata.hasOwnProperty(property)) {
                result[property] = this.filterProperty(property, metadata[property], model);
            }
        }
        return this.filter(result, model);
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
    filter(metadata, model) {
        let processedMetadata = metadata;
        for(let i=0; i<this.metadataFilters.length; i++) {
            processedMetadata = this.metadataFilters[i].filter(processedMetadata, model);
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
metadataEvaluator.addPropertyFilter(defaultPropertyMetadataFilter);
metadataEvaluator.addPropertyFilter(conditionMessagePropertyFilter, 'invalid');
metadataEvaluator.addFilter(defaultMetadataFilter);

export default metadataEvaluator;
