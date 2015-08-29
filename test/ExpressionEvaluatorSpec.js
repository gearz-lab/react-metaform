import expressionEvaluator from '../src/lib/ExpressionEvaluator.js';
import formato from 'formato';


describe('Expression evaluator', function () {
        it('Literals', function () {
            assert.strictEqual(expressionEvaluator.evaluate('1 + 1'), 2);
        });
        it('Boolean', function () {
            assert.strictEqual(expressionEvaluator.evaluate('true'), true);
        });
        it('Boolean', function () {
            assert.strictEqual(expressionEvaluator.evaluate('true'), true);
        });
        it('Function', function () {
            assert.strictEqual(expressionEvaluator.evaluate(m => m.nome, { nome: 'Andre'}), 'Andre');
        });
        it('Function with helper format', function () {
            assert.strictEqual(expressionEvaluator.evaluate((m, h) => h.format(m.value), { value: 200}), '200.00');
        });
        it('Function with helper format with custom precision', function () {
            assert.strictEqual(expressionEvaluator.evaluate((m, h) => h.format(m.value, {precision: 0}), { value: 200}), '200');
        });
});
