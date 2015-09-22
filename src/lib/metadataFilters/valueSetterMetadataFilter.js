import _ from 'underscore';

class EntityMetadataFilter {
    filter(metadata, model, keyPrefix, metadataEvaluator) {
        if(!metadata) {
            throw new Error('metadata is required');
        }
        if(!model) {
            throw new Error('model is required');
        }
        // experimenting seting the value property of each metadata
        if(model) {
            if(model.hasOwnProperty(metadata.name) && !metadata.hasOwnProperty('value')) {
                metadata.value = model[metadata.name];
            }
        }
        return metadata;
    }
}

export default new EntityMetadataFilter();