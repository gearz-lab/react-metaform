import _ from 'underscore';

class MetadataProvider {

    /**
     * Validates a field metadata
     * @param metadata
     * @private
     */
    validateFieldMetadata(metadata) {
        if(!metadata) throw Error('metadata should not be null or undefined');
        if(!metadata.name) throw Error('metadata\'s "name" property is required');
        if(!metadata.type) throw Error('metadata\'s "type" property is required');
    }

    getFieldsInternal(entityFields, layout, partialResult) {
        if(!partialResult) {
            partialResult = [];
        }

        let thisGroupFields = [];

        if(!layout.fields && !layout.groups) {
            throw Error('a layout can either have fields or groups. Never both.');
        }

        if(layout.groups) {
            for(let i = 0; i < layout.groups.length; i++) {
                thisGroupFields = _.union(thisGroupFields, this.getFieldsInternal(entityFields, layout.groups[i], partialResult));
            }
        }
        else if (layout.fields) {
            thisGroupFields = layout.fields.map(item => {
                let existingEntityProperty = _.find(entityFields, property => property.name == item.name);
                let field = existingEntityProperty ? existingEntityProperty : {};
                field = _.extend({}, field, item);
                this.validateFieldMetadata(field);
                return field;
            });
        }
        else {
            console.log(layout);
            throw Error('a layout must have either fields or groups.');
        }
        return _.union(partialResult, thisGroupFields);

    }

    getEntityAndLayout(schema, entityName, layoutName) {
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
        return {
            entity: entity,
            layout: layout
        }
    }

    /**
     * Merges the given field collection
     * @param schema
     * @param entityName
     * @layoutName layoutName
     */
    getFields(schema, entityName, layoutName) {
        let entityAndLayout = this.getEntityAndLayout(schema, entityName, layoutName);
        return this.getFieldsInternal(entityAndLayout.entity.fields, entityAndLayout.layout);
    }
}

export default new MetadataProvider();