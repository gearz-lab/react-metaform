import _ from 'underscore';

class MetadataProvider {

    /**
     * Validates a field metadata
     * @param metadata
     * @private
     */
    validateFieldMetadata(metadata) {
        if(!metadata) throw new Error('metadata should not be null or undefined');
        if(!metadata.name) throw new Error('metadata\'s "name" property is required');
        if(!metadata.type) throw new Error('metadata\'s "type" property is required');
    }

    /**
     * Merges the given field collection
     * @param schema
     * @param entityName
     * @layoutName layoutName
     */
    getFields(schema, entityName, layoutName) {

        if (schema === null || schema === undefined) {
            throw new Error(`'mergeFields' received invalid parameters. Parameter should not be not or undefined. Parameter name: schema`);
        }

        if(schema.layouts === undefined || schema.layouts === null) {
            throw new Error('Parameter should not be null or undefined. Parameter: ' + schema.layout);
        }

        if(schema.entities === undefined || schema.entities === null) {
            throw new Error('Parameter should not be null or undefined. Parameter: ' + schema.entity);
        }

        if (entityName === null || entityName === undefined) {
            throw new Error(`'mergeFields' received invalid parameters. Parameter should not be not or undefined. Parameter name: entityName`);
        }

        if (layoutName === null || layoutName === undefined) {
            throw new Error(`'mergeFields' received invalid parameters. Parameter should not be not or undefined. Parameter name: layoutName`);
        }

        let entity = _.find(schema.entities, e => e.name === entityName);
        if(!entity) {
            throw new Error(`Could not find entity. Entity name: ${entityName}`);
        }
        let layout = _.find(schema.layouts, l => l.name === layoutName);
        if(!layout) {
            throw new Error(`Could not find layout. Layout name: ${layoutName}`);
        }

        let entityFields = entity.fields;
        let layoutFields = layout.fields;

        const fields = layoutFields.map(item => {
            let existingEntityProperty = _.find(entityFields, property => property.name == item.name);
            let field = existingEntityProperty ? existingEntityProperty : {};
            field = _.extend({}, field, item);
            this.validateFieldMetadata(field);
            return field;
        });

        // validate fields
        return fields;
    }
}

export default new MetadataProvider();