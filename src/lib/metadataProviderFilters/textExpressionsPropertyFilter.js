import functionHelper from '../helpers/functionHelper.js';

class TextExpressionsFilter {
    filter(metadata) {
        if(!metadata) {
            throw new Error('metadata is required');
        }
        for(let metadataProperty in metadata) {
            if(metadata.hasOwnProperty(metadataProperty)) {
                if(typeof metadata[metadataProperty] == 'string' && functionHelper.isExpression(metadata[metadataProperty])) {
                    metadata[metadataProperty] = functionHelper.generateFromTextExpression(metadata[metadataProperty]);
                }
            }
        }
    }
}
export default new TextExpressionsFilter();
