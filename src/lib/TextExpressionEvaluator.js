/**
 * Evaluates text expressions
 */
export default {
        /**
         * Evaluates the given text expression
         * @param expression - the text expression
         * @param data - the data scope in which the expression will be executed
         * @returns {Object}
         */
        evaluate: function (expression, data) {
            // contains all variable statements. Each variable in 'data' will result in a declaraction statement.
            // example: if, data is { x : 1 }, variableDeclarations will contain: 'var x = 1'
            // I didn't necessarily have to use these declarations, because the scope of 'eval' is the current scope,
            // that is, I could just put the 'data' first level variables in scope inside this function and it would work,
            // but it would be EXTREMELY unsafe.
            // However, eval will not use the outside scope if it's in 'use strict' mode.
            let variableDeclarations = [];
            let finalExpression = '\'use strict\';\n';
            if (data) {
                for (let prop in data) {
                    let declaration = `var ${prop} = ${JSON.stringify(data[prop])};\n`;
                    variableDeclarations.push(declaration);
                }
            }
            for (let i = 0; i < variableDeclarations.length; i++) {
                finalExpression += variableDeclarations[i];
            }
            finalExpression += expression;
            try {
                /* eslint-disable */
                return eval(finalExpression);
                /* eslint-enable */
            }catch(ex) {
                // Expressions shouldn't trigger an error
                return undefined;
            }
        }
    };
