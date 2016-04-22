import expressionEvaluator from '../expressionEvaluator.js';

export default {
    filter: function(propertyName, propertyValue, model) {
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