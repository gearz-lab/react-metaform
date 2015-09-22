import _ from 'underscore';

class EntityMetadataFilter {
    filter(metadata, model, keyPrefix, metadataEvaluator) {
        if (!metadata) {
            throw new Error('metadata is required');
        }
        if (!model) {
            throw new Error('model is required');
        }
        if (metadata.type == 'array' && metadata.arrayType == 'entity') {
            if (!metadata.fields) {
                throw Error('when metadata is of type \'array\' and arrayType is \'entity\', it must have a fields property');
            }

            if (!_.has(model, metadata.name) || model[metadata.name] === null || model[metadata.name] === undefined) {
                // if the property does not exist, create it
                model[metadata.name] = [];
            } else {
                // if the property exists, it must be an object
                if (!(model[metadata.name] instanceof Array)) {
                    throw Error('when metadata is of type array, the model value should be an array');
                }
            }

            metadata.fields = model[metadata.name].map((item, index) =>  metadataEvaluator.evaluate(metadata.fields, item, `${keyPrefix}.${index}`));
        }
        return metadata;
    }
}

export default new EntityMetadataFilter();