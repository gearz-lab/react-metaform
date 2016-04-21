import expressionEvaluator from '../expressionEvaluator.js';

class DefaultMetadataPropertyFilter {
    filter(propertyName, propertyValue, model) {
        if(!model) {
            throw new Error('model is required');
        }
        if (typeof(propertyValue) === "function" && propertyName.indexOf('_') != 0) {
            // do something
            return expressionEvaluator.evaluate(propertyValue, model);
        }
        return propertyValue;
    }
}
export default new DefaultMetadataPropertyFilter();
