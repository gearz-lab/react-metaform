import functionHelper from '../helpers/functionHelper.js';

class TextExpressionsFilter {
    filter(metadata) {
        if(!metadata) {
            throw new Error('metadata is required');
        }
        for(let metadataProperty in metadata) {
            if(metadata.hasOwnProperty(metadataProperty)) {
                if(functionHelper.isTextExpression(metadata[metadataProperty])) {
                    metadata[metadataProperty] = functionHelper.generateFromTextExpression(metadata[metadataProperty]);
                }
            }
        }
        return metadata;
    }
}
export default new TextExpressionsFilter();
