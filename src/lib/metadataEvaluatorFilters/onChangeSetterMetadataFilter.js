import _ from 'underscore';

class OnChangeMetadataFilter {
    filter(propertyMetadata, model, keyPrefix, metadataEvaluator, metadataIndex, reduxProps, onChange) {
        if(!metadata) {
            throw new Error('metadata is required');
        }
        if(!model) {
            throw new Error('model is required');
        }
        // experimenting setting the value property of each metadata
        metadata.onChange = onChange;
        return metadata;
    }
}

export default new OnChangeMetadataFilter();