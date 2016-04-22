import _ from 'underscore';

export default {
    filter: function(propertyMetadata, model, keyPrefix, metadataEvaluator, reduxProps, onChange) {
        
        if(!propertyMetadata) throw Error('Argument \'propertyMetadata\' should be truthy');
        if(!model) throw Error('Argument \'model\' should be truthy');
        
        if (propertyMetadata.type == 'array' && propertyMetadata.arrayType == 'entity') {
            if (!propertyMetadata.fields) {
                throw Error('when metadata is of type \'array\' and arrayType is \'entity\', it must have a fields property');
            }

            if (!_.has(model, propertyMetadata.name) || model[propertyMetadata.name] === null || model[propertyMetadata.name] === undefined) {
                // if the property does not exist, create it
                model[propertyMetadata.name] = [];
            } else {
                // if the property exists, it must be an object
                if (!(model[propertyMetadata.name] instanceof Array)) {
                    throw Error('when metadata is of type array, the model value should be an array');
                }
            }
            
            // returns the reduxProps for a particular array item
            let getReduxPropsForItem = (index) => {
                if(!reduxProps) return undefined;
                if(!_.has(reduxProps, propertyMetadata.name)) throw Error('reduxProps is defined but it does not have the required property metadata');
                return reduxProps[propertyMetadata.name][index];
            };
            
            propertyMetadata.fields = model[propertyMetadata.name].map((item, index) =>  metadataEvaluator.evaluate(propertyMetadata.fields, item, `${keyPrefix}.${index}`, getReduxPropsForItem(index), onChange));
        }
        return propertyMetadata;
    }
}