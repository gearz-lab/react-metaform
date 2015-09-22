import _ from 'underscore';

class EntityMetadataFilter {
    filter(metadata, model, keyPrefix, metadataEvaluator) {
        if(!metadata) {
            throw new Error('metadata is required');
        }
        if(!model) {
            throw new Error('model is required');
        }
        if(metadata.type == 'entity') {
            if(! metadata.fields) {
                throw Error('when metadata is of type entity, it must have a fields property');
            }

            if(!_.has(model, metadata.name) || model[metadata.name] === null || model[metadata.name] === undefined) {
                // if the property does not exist, create it
                model[metadata.name] = {};
            } else {
                // if the property exists, it must be an object
                if (typeof model[metadata.name] !== 'object') {
                    throw Error('when metadata is of type entity, the model value should be an object');
                }
            }
            metadata.fields = metadataEvaluator.evaluate(metadata.fields, model[metadata.name], keyPrefix);
        }
        return metadata;
    }
}

export default new EntityMetadataFilter();