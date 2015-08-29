import TypeProcessor from './TypeProcessor.js';

class StringTypeProcessor extends TypeProcessor {

    constructor() {
        super();
    }

    /**
     * Processes a string as an integer
     * @param value
     */
    process(value) {
        return {
            valid: true,
            convertedValue: value
        };
    }
}

export default StringTypeProcessor;