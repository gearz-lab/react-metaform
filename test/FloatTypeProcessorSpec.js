import chai from 'chai';
import FloatTypeProcessor from '../src/lib/typeProcessors/FloatTypeProcessor.js';
const defaultFloatProcessor = new FloatTypeProcessor();
const assert = chai.assert;

describe('FloatTypeProcessor', function() {
    describe('process', function() {

        it('Invalid float - undefined', function() {
            var result = defaultFloatProcessor.process('abc');
            assert.isUndefined(result.convertedValue);
            assert.equal(false, result.valid);
        });

        it('Invalid float - null', function() {
            var result = defaultFloatProcessor.process('abc');
            assert.isUndefined(result.convertedValue);
            assert.equal(false, result.valid);
        });

        it('Invalid float - string', function() {
            var result = defaultFloatProcessor.process('abc');
            assert.isUndefined(result.convertedValue);
            assert.equal(false, result.valid);
        });

        it('Invalid float - string space', function() {
            var result = defaultFloatProcessor.process(' ');
            assert.isUndefined(result.convertedValue);
            assert.equal(false, result.valid);
        });

        it('Invalid float - float US', function() {
            var result = defaultFloatProcessor.process('2.3');
            assert.strictEqual(result.convertedValue, 2.3);
            assert.equal(true, result.valid);
        });

        it('Invalid float - float US multiple decimal places', function() {
            var result = defaultFloatProcessor.process('2.334');
            assert.strictEqual(result.convertedValue, 2.334);
            assert.equal(true, result.valid);
        });

        it('Invalid float - float BR - when passing a config', function() {
            let brProcessor = new FloatTypeProcessor({decimal: ',', thousand: '.'});
            let result = brProcessor.process('2,3');
            assert.strictEqual(result.convertedValue, 2.3);
            assert.equal(true, result.valid);
        });

        it('Valid float', function() {
            var result = defaultFloatProcessor.process('2837');
            assert.strictEqual(2837, result.convertedValue);
            assert.equal(true, result.valid);
        });

        it('Valid float zero', function() {
            var result = defaultFloatProcessor.process('0');
            assert.strictEqual(0, result.convertedValue);
            assert.equal(true, result.valid);
        });

        it('Valid float - float BR - when not passing a config', function() {
            var result = defaultFloatProcessor.process('2,3');
            assert.strictEqual(result.convertedValue, 23);
            assert.isTrue(result.valid);
        });

        it('Valid float padded zero', function() {
            var result = defaultFloatProcessor.process('0000');
            assert.strictEqual(0, result.convertedValue);
            assert.equal(true, result.valid);
        });

        it('Valid float positive zero', function() {
            var result = defaultFloatProcessor.process('+0000');
            assert.strictEqual(0, result.convertedValue);
            assert.equal(true, result.valid);
        });

        it('Valid float negative zero', function() {
            var result = defaultFloatProcessor.process('-0000');
            assert.strictEqual(0, result.convertedValue);
            assert.equal(true, result.valid);
        });

        it('Valid float integer', function() {
            var result = defaultFloatProcessor.process('+2837');
            assert.strictEqual(2837, result.convertedValue);
            assert.equal(true, result.valid);
        });

        it('Valid float padded integer', function() {
            var result = defaultFloatProcessor.process('+0002837');
            assert.strictEqual(2837, result.convertedValue);
            assert.equal(true, result.valid);
        });

        it('Valid float integer', function() {
            var result = defaultFloatProcessor.process('-2837');
            assert.strictEqual(-2837, result.convertedValue);
            assert.equal(true, result.valid);
        });

        it('Valid float padded integer', function() {
            var result = defaultFloatProcessor.process('-0002837');
            assert.strictEqual(-2837, result.convertedValue);
            assert.equal(true, result.valid);
        });
    });
});