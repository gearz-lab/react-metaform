import TypeProcessor from './TypeProcessor.js';
import formato from 'formato';
import Config from './defaultConfig.js';

class FloatTypeProcessor extends TypeProcessor {

    constructor(config) {
        super();
        this.config = config ? config : Config.numberFormat;
        if(!this.config || !this.config.decimal) {
            throw new Error(`Could not get the number configuration. Make sure you have a file called gearz.config.js and that it exports an object like this: { numberFormat: { decimalMark:\'.\' } }`);
        }
    }

    /**
     * Processes a string as an integer
     * @param value
     */
    process(value) {

        // if the value is null or undefined
        if(value === undefined || value === null || value === '') {
            return {
                valid: true,
                convertedValue: null
            };
        }

        let convertedValue = formato.unformat(value, this.config);
        if(!isNaN(convertedValue)) {
            return {
                valid: true,
                convertedValue: convertedValue
            };
        }
        else {
            return {
                valid: false,
                convertedValue: undefined
            }
        }
    }
}

export default FloatTypeProcessor;