class FunctionHelper {

    constructor() {
        this.regex = /^_exp:(.*)/;
    }

    /**
     * Returns whether or not the given string is a text expression
     * @param textExpression
     */
    isTextExpression(textExpression) {
        return typeof textExpression === 'string' && this.regex.test(textExpression);
    }

    /**]
     * Returns whether or not the given variable is a function
     * @param func
     * @returns {boolean}
     */
    isFunction(func) {
        return typeof func === 'function';
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

    /**
     * If the object passed in is a function, returns the function. If it's a text expression, returns the converted
     * function. Otherwise, throws an exception
     * @param func
     */
    getFunction(func) {
        if(this.isFunction(func)) {
            return func;
        }
        else if (this.isTextExpression(func)) {
            return this.generateFromTextExpression(func);
        }
        throw Error('func should be either a function or a text expression');
    }
}

export default new FunctionHelper();