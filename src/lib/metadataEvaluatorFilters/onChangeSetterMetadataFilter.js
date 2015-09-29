import _ from 'underscore';

class OnChangeMetadataFilter {
    filter(metadata, model, keyPrefix, metadataEvaluator, metadataIndex, onChange) {
        if(!metadata) {
            throw new Error('metadata is required');
        }
        if(!model) {
            throw new Error('model is required');
        }
        // experimenting seting the value property of each metadata
        metadata.onChange = onChange;
        return metadata;
    }
}

export default new OnChangeMetadataFilter();