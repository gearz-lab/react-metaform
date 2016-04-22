import expressionEvaluator from '../expressionEvaluator';

/**
 * Default validator
 */
export default function (propertyMetadata, model, validator) {
    if (propertyMetadata.type == 'entity' || propertyMetadata.type == 'array') return undefined;
    if (!propertyMetadata.error) return undefined;

    return expressionEvaluator.evaluate(propertyMetadata.error, model);
}