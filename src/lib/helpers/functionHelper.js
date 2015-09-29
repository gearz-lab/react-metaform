class FunctionHelper {
    /**
     * Generates a function based on a text expression
     * @param textExpression
     */
    generateFromTextExpression(textExpression) {
        let textExpressionRegex = /^_exp:(.*)/;
        let match = textExpressionRegex.exec(textExpression);
        if(!match.length) {
            throw Error('string is not a valid text expression. String: ' + textExpression);
        }
        try {
            // creates a function with two arguments, 'm' and 'e'
            return Function("m", "e", `return ${match[1]}`);
        }
        catch(e) {
            // in case the function is not valid it should just return null;
            return null;
        }
    }
}

export default new FunctionHelper();