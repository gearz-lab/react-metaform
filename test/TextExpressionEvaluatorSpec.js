import textExpressionEvaluator from '../src/lib/ExpressionEvaluator.js';

describe('Text expression evaluator', function() {
    describe('Literals', function() {
        it('Should evaluate number operations', function() {
            assert.strictEqual(textExpressionEvaluator.evaluate('1 + 1'), 2);
        });
        it('Should evaluate boolean operations', function() {
            assert.strictEqual(textExpressionEvaluator.evaluate('true'), true);
        });
    });
    describe('Variables', function() {
        it('Should evaluate first level variables', function() {
            assert.strictEqual(textExpressionEvaluator.evaluate('x + 1', { x : 1 }), 2 );
        });
        it('Should evaluate deep variables', function() {
            assert.strictEqual(textExpressionEvaluator.evaluate('x.y.z + 1', { x: { y: { z: 1 } } }), 2);
        });
        it('Should scape strings correctly', function() {
            assert.strictEqual(textExpressionEvaluator.evaluate('x.y.z + \'ny\'', { x: { y: { z: 'john' } } }), 'johnny');
        });
    });
});
