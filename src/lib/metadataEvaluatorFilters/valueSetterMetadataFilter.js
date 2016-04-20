import _ from 'underscore';

class EntityMetadataFilter {
    filter(propertyMetadata, model, keyPrefix, metadataEvaluator, metadataIndex, reduxProps, onChange) {
        if(!propertyMetadata) {
            throw new Error('metadata is required');
        }
        if(!model) {
            throw new Error('model is required');
        }
        // experimenting seting the value property of each metadata
        if(model) {
            if(model.hasOwnProperty(propertyMetadata.name) && !propertyMetadata.hasOwnProperty('value')) {
                propertyMetadata.value = model[propertyMetadata.name];
            }
        }
        return propertyMetadata;
    }
}

export default new EntityMetadataFilter();