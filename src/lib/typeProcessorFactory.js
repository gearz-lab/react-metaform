import StringTypeProcessor from './typeProcessors/StringTypeProcessor.js';
import IntTypeProcessor from './typeProcessors/IntTypeProcessor.js';
import FloatTypeProcessor from './typeProcessors/FloatTypeProcessor.js';

class TypeProcessorFactory {

    constructor() {
        this.processorsByType = { };
    }

    registerProcessorType(type, processor) {
        this.processorsByType[type] = processor;
    }

    getProcessorType(type) {
        if(this.processorsByType.hasOwnProperty(type)) {
            return this.processorsByType[type];
        }
        return StringTypeProcessor;
    }
}

let typeProcessorFactory = new TypeProcessorFactory();

typeProcessorFactory.registerProcessorType('string', StringTypeProcessor);
typeProcessorFactory.registerProcessorType('int', IntTypeProcessor);
typeProcessorFactory.registerProcessorType('float', FloatTypeProcessor);

export default typeProcessorFactory;