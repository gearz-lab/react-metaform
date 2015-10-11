import expressionEvaluator from '../ExpressionEvaluator.js';

class ConditionMessagePropertyFilter {
    filter(propertyName, propertyValue, model) {
        if(propertyValue === undefined) {
            return undefined;
        }
        if(!model) {
            throw new Error('model is required');
        }
        if(!(propertyValue.constructor === Array)) {
            throw new Error('metadata should be an array');
        }
        for(var i = 0; i < propertyValue.length; i++) {
            let metadataItem = propertyValue[i];
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
