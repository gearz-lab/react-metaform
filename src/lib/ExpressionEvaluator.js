import textExpressionEvaluator from './TextExpressionEvaluator.js';
import expressionHelper from './expressionHelper.js';

/**
 * Evaluates expressions
 */
export default {
        /**
         * Evaluates the given expression
         * @param expression - the expression to be evaluated. This can be either a constant, a function or a text expression
         * @param data - the data scope in which the expression will be executed
         * @returns {Object}
         */
        evaluate: function (expression, data) {
            switch (typeof expression) {
                case 'function':
                    try {
                        return expression(data, expressionHelper);
                    }catch(ex) {
                        // expressions shouldn't trigger an error
                        return undefined;
                    }
                case 'string':
                    return textExpressionEvaluator.evaluate(expression, data, expressionHelper);
                default:
                    return expression;
            }
        }
    };
