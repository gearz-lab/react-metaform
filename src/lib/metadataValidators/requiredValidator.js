import expressionEvaluator from '../expressionEvaluator';

/**
 * Validates required properties
 */
export default function(propertyMetadata, modelValue, model, validator) {
    if(!propertyMetadata.required || (modelValue !== undefined && modelValue !== null && modelValue !== '')) return undefined;
    
    let x = (m) => { return m > 500 };

    
    return expressionEvaluator.evaluate(propertyMetadata.required, model) ? 'Required' : undefined;
}