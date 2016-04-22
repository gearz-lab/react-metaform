import _ from 'underscore';

export default {
    filter: function(propertyMetadata, model, keyPrefix, metadataEvaluator, reduxProps, onChange) {
        if(!propertyMetadata) {
            throw new Error('metadata is required');
        }
        if(!model) {
            throw new Error('model is required');
        }
        if(propertyMetadata.type == 'entity') {
            if(! propertyMetadata.fields) {
                throw Error('when metadata is of type entity, it must have a fields property');
            }

            if(!_.has(model, propertyMetadata.name) || model[propertyMetadata.name] === null || model[propertyMetadata.name] === undefined) {
                // if the property does not exist, create it
                model[propertyMetadata.name] = {};
            } else {
                // if the property exists, it must be an object
                if (typeof model[propertyMetadata.name] !== 'object') {
                    throw Error('when metadata is of type entity, the model value should be an object');
                }
            }
            let itemReduxProps = reduxProps ? reduxProps[propertyMetadata.name] : undefined;
            propertyMetadata.fields = metadataEvaluator.evaluate(propertyMetadata.fields, model[propertyMetadata.name], keyPrefix, itemReduxProps, onChange);
        }
        return propertyMetadata;
    }
}