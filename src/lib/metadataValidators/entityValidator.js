/**
 * Entity validator
 */
export default function(propertyMetadata, modelValue, model, validator) {
    if(!modelValue) return undefined;
    if (propertyMetadata.type != 'entity') return undefined;
    
    return validator.validate(propertyMetadata.fields, modelValue);
};