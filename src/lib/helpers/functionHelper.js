class FunctionHelper {

    constructor() {
        this.regex = /^_exp:(.*)/;
    }

    /**
     * Returns whether or not the given string is a text expression
     * @param textExpression
     */
    isExpression(textExpression) {
        return this.regex.test(textExpression);
    }

    /**
     * Generates a function based on a text expression
     * @param textExpression
     */
    generateFromTextExpression(textExpression) {
        let match = this.regex.exec(textExpression);
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