// metadata filters
import defaultMetadataFilter from './metadataEvaluatorFilters/defaultMetadataFilter.js';
import entityMetadataFilter from './metadataEvaluatorFilters/entityMetadataFilter.js';
import arrayMetadataFilter from './metadataEvaluatorFilters/arrayMetadataFilter.js';

// property filters
import defaultPropertyMetadataFilter from './metadataEvaluatorPropertyFilters/defaultMetadataPropertyFilter.js';
import _ from 'underscore';

class MetadataEvaluator {

    constructor() {
        // this array contains objects like: { property: 'invalid', filter: filter }
        // fieldFilters that don't have a property associated will act on all properties
        // in the order they were registered
        this.fieldFilters = [];
        // this array contains metadata filters
        this.propertyFilters = [];
    }

    /**
     * Evaluates the given metadata against the model
     * @param propertyMetadata - Can be either an object or an array of objects
     * @param model
     * @param keyPrefix
     * @param reduxProps
     * @param onChange
     * @returns {{}}
     */
    evaluate(propertyMetadata, model, keyPrefix, reduxProps, onChange) {
        if(!propertyMetadata) throw Error('Argument \'propertyMetadata\' should be truthy');
        if (!model) throw Error('\'model\' should be truthy');
        if (propertyMetadata.constructor === Array) return propertyMetadata.map(i => this.evaluate(i, model, keyPrefix, reduxProps, onChange));

        let result = {};
        _.each(_.keys(propertyMetadata), (fieldName) => { result[fieldName] = this.filterPropertyField(fieldName, propertyMetadata[fieldName], model); });
        let newPrefix = keyPrefix ? `${keyPrefix}.${propertyMetadata.name}` : propertyMetadata.name;
        return this.filterProperty(result, model, newPrefix, reduxProps, onChange);
    }

    /**
     * Adds the given filter
     */
    addPropertyFilter(filter) {
        if (!filter) throw Error('\'filter\' should be truthy');
        this.propertyFilters.push(filter);
    }

    /**
     * Adds the given filter for the given metadata property name
     * @param metadataProperty
     * @param filter
     */
    addPropertyFieldFilter(filter, metadataProperty) {
        if (!filter) throw Error('\'filter\' should be truthy');
        this.fieldFilters.push({property: metadataProperty, filter: filter});
    }

    /**
     * Filters the given property against the model
     * @param fieldName
     * @param fieldValue
     * @param model
     */
    filterPropertyField(fieldName, fieldValue, model) {
        let processedFieldValue = fieldValue;
        for (let i = 0; i < this.fieldFilters.length; i++) {
            if (!this.fieldFilters[i].property || this.fieldFilters[i].property === fieldName) {
                processedFieldValue = this.fieldFilters[i].filter.filter(fieldName, processedFieldValue, model);
            }
        }
        return processedFieldValue;
    }

    /**
     * Filters the given metadata against the model
     * @param metadata
     * @param model
     * @param keyPrefix
     * @param metadataIndex
     * @param reduxProps
     * @returns {*}
     */
    filterProperty(metadata, model, keyPrefix, metadataIndex, reduxProps) {
        let processedMetadata = metadata;
        for (let i = 0; i < this.propertyFilters.length; i++) {
            processedMetadata = this.propertyFilters[i].filter(processedMetadata, model, keyPrefix, this, metadataIndex, reduxProps);
        }
        return processedMetadata;
    }
}

let metadataEvaluator = new MetadataEvaluator();

// register metadata filters
metadataEvaluator.addPropertyFilter(defaultMetadataFilter); // sets redux props, key and id
metadataEvaluator.addPropertyFilter(entityMetadataFilter); // processes entities
metadataEvaluator.addPropertyFilter(arrayMetadataFilter); // processes arrays

// register property field filters
metadataEvaluator.addPropertyFieldFilter(defaultPropertyMetadataFilter); // evaluates functions to literals

export default metadataEvaluator;