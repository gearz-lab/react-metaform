import chai from 'chai';
import functionHelper from '../src/lib/helpers/functionHelper.js';
import expressionHelper from '../src/lib/expressionHelper.js';
const assert = chai.assert;

describe('FunctionHelper', function() {
    describe('generateFromTextExpression', function() {
        it('Literal', function() {
            let result = functionHelper.generateFromTextExpression('_exp:2')();
            assert.equal(result, 2);
        });
        it('Passing a model', function() {
            let model = {
                name: 'Andre'
            };
            let result = functionHelper.generateFromTextExpression('_exp:m.name')(model);
            assert.equal(result, 'Andre');
        });
        it('Invalid expression', function() {
            let model = {
                name: 'Andre'
            };
            assert.throw(() => functionHelper.generateFromTextExpression('_exp:m.something.bad')(model), TypeError);
        });
    });
});