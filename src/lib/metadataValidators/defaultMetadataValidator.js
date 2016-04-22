import expressionEvaluator from '../expressionEvaluator';

export default {
    validate: function(propertyMetadata, model, validation) {
        if(propertyMetadata.type == 'entity' || propertyMetadata.type == 'array') return undefined;
        if(!propertyMetadata.error) return undefined;
        
        return expressionEvaluator.evaluate(propertyMetadata.error, model);
    }
}