import expressionEvaluator from '../ExpressionEvaluator.js';

class DefaultMetadataPropertyFilter {
    filter(metadataValue, model) {
        if(!model) {
            throw new Error('model is required');
        }
        if (typeof(metadataValue) === "function") {
            // do something
            return expressionEvaluator.evaluate(metadataValue, model);
        }
        return metadataValue;
    }
}
export default new DefaultMetadataPropertyFilter();
