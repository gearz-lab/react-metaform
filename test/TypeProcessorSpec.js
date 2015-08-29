import typeProcessorFactory from '../src/lib/typeProcessorFactory.js';
import chai from 'chai';
const assert = chai.assert;

describe('TypeProcessorFactory', function() {
    it('Should work for a valid type', function() {
        let ProcessorType = typeProcessorFactory.getProcessorType('int');
        assert.ok(ProcessorType);
        let processor = new ProcessorType();
        let processingResult = processor.process('2');
        assert.equal(2, processingResult.convertedValue);
    });
    it('Should return the StringTypeProcessor for an unknown type', function() {
        let ProcessorType = typeProcessorFactory.getProcessorType('int2');
        assert.ok(ProcessorType);
    });
    if('Should throw for falsy values', function() {
        assert.throws(() => typeProcessorFactory.getProcessorType(''), /Could not get processor for type/);
        assert.throws(() => typeProcessorFactory.getProcessorType(undefined), /Could not get processor for type/);
        assert.throws(() => typeProcessorFactory.getProcessorType(null), /Could not get processor for type/);
        assert.throws(() => typeProcessorFactory.getProcessorType(0), /Could not get processor for type/);
    });
});