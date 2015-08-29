import expressionEvaluator from '../ExpressionEvaluator.js';

class ConditionMessagePropertyFilter {
    filter(metadataValue, model) {
        if(metadataValue === undefined) {
            return undefined;
        }
        if(!model) {
            throw new Error('model is required');
        }
        if(!(metadataValue.constructor === Array)) {
            throw new Error('metadata should be an array');
        }
        for(var i = 0; i < metadataValue.length; i++) {
            let metadataItem = metadataValue[i];
            let metadataConditionResult = expressionEvaluator.evaluate(metadataItem.condition, model);
            if(metadataConditionResult === true) {
                return {
                    value: true,
                    message: metadataItem.message
                }
            }
        }
        return {
            value: false
        }
    }
}
export default new ConditionMessagePropertyFilter();
