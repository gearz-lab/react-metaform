import expressionEvaluator from '../ExpressionEvaluator.js';

class DefaultMetadataPropertyFilter {
    filter(metadataValue, model) {
        if(!model) {
            throw new Error('model is required');
        }
        return metadataValue;
    }
}
export default new DefaultMetadataPropertyFilter();
