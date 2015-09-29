import expressionEvaluator from '../ExpressionEvaluator.js';
import dataEvaluator from '../DataEvaluator.js';

class DefaultMetadataFilter {
    filter(metadata, model, keyPrefix, metadataEvaluator) {
        if(!metadata) {
            throw new Error('metadata is required');
        }
        if(!model) {
            throw new Error('model is required');
        }
        let value = dataEvaluator.evaluate(metadata, model);
        if(metadata.required && (value === null || value === undefined || value === '')) {
            metadata.invalid = {value: true, message: `The field '${metadata.name}' is required`};
        }
        return metadata;
    }
}
export default new DefaultMetadataFilter();
