import expressionEvaluator from '../ExpressionEvaluator.js';
import dataEvaluator from '../DataEvaluator.js';
import _ from 'underscore';

class DefaultMetadataFilter {
    filter(propertyMetadata, model, keyPrefix, metadataEvaluator, metadataIndex, reduxProps, onChange) {
        
        if(!propertyMetadata) throw Error('Argument \'propertyMetadata\' should be truthy');
        if(!model) throw Error('Argument \'model\' should be truthy');
               
        propertyMetadata.key = keyPrefix;
        //propertyMetadata.id = keyPrefix;
        
        // set redux properties
        if(_.has(reduxProps, propertyMetadata.name)) {
            propertyMetadata.reduxFormProps = reduxProps[propertyMetadata.name];
        }
        
        return propertyMetadata;
    }
}
export default new DefaultMetadataFilter();