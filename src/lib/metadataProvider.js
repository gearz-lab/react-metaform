import _ from 'underscore';

class MetadataProvider {

    /**
     * Validates a field metadata
     * @param metadata
     * @private
     */
    validateFieldMetadata(metadata) {
        if (!metadata) throw new Error('metadata should not be null or undefined');
        if (!metadata.name) throw new Error('metadata\'s "name" property is required');
        if (!metadata.type) throw new Error('metadata\'s "type" property is required');
    }

    /**
     * Merges the given layout fields with the given entity fields
     * @param layoutFields
     * @param entityFields
     * @returns {*}
     */
    mergeFields(layoutFields, entityFields) {
        return layoutFields.map(item => {
            let existingEntityProperty = _.find(entityFields, property => property.name == item.name);
            let field = existingEntityProperty ? existingEntityProperty : {};
            field = _.extend({}, field, item);
            this.validateFieldMetadata(field);
            return field;
        });
    }

    /**
     * Merges the given layout rows fields with the given entity fields
     * @param layoutRows
     * @param entityFields
     * @returns {*}
     */
    mergeRows(layoutRows, entityFields) {
        return layoutRows.map(row => {
            let mergedRow = _.extend({}, row);
            mergedRow.fields = this.mergeFields(row.fields, entityFields);
            return mergedRow;
        });
    }

    /**
     * Merges the given layout groups with the given entity fields
     * @param layoutGroups
     * @param entityFields
     * @returns {*}
     */
    mergeGroups(layoutGroups, entityFields) {
        return layoutGroups.map(group => {
            let mergedGroup = _.extend({}, group);


            if(group.rows){
                mergedGroup.rows = this.mergeRows(group.rows, entityFields);
            }
            else if (group.fields) {
                mergedGroup.rows = [{}];
                mergedGroup.rows[0].fields = this.mergeFields(group.fields, entityFields);
            }

            return mergedGroup;
        });
    }

    getProcessedSchema(schema, entityName, layoutName) {
        if (schema === null || schema === undefined) {
            throw Error('schema should not be null or undefined');
        }

        if (schema.entities === undefined || schema.entities === null) {
            throw Error('schema.entities should not be null or undefined');
        }

        if (entityName === null || entityName === undefined) {
            throw Error('entityName should not be null or undefined');
        }

        let entity = _.find(schema.entities, e => e.name === entityName);
        if (!entity) {
            throw Error(`Could not find entity. Entity name: ${entityName}`);
        }

        let layout;
        if(!entity.layouts || entity.layouts.length == 0) {
            // when the entity has no layout, we're going to create a fake layout
            // just so the result is normalized
            layout = {
                groups: [
                    {
                        rows: [
                            {
                                fields: entity.fields
                            }
                        ]
                    }
                ]
            }
        }
        else {
            // the entity does have layouts
            if(!layoutName) {
                throw Error('layoutName cannot be null or undefined');
            }
            layout = _.find(entity.layouts, l => l.name === layoutName);
        }

        let processedSchema = {};

        if (layout.groups) {
            processedSchema.groups = this.mergeGroups(layout.groups, entity.fields);
        }
        else if (layout.rows) {
            processedSchema.groups = [{ rows: []}];
            processedSchema.groups[0].rows = this.mergeRows(layout.rows, entity.fields);
        }
        else if (layout.fields) {
            processedSchema.groups = [{ rows: [{}]}];
            processedSchema.groups[0].rows[0].fields = this.mergeFields(layout.fields, entity.fields);
        }

        return processedSchema;
    }

    /**
     * Merges the given field collection
     * @param schema
     * @param entityName
     * @layoutName layoutName
     */
    getFields(schema, entityName, layoutName) {

        if (schema === null || schema === undefined) {
            throw Error(`'mergeFields' received invalid parameters. Parameter should not be not or undefined. Parameter name: schema`);
        }

        if (schema.layouts === undefined || schema.layouts === null) {
            throw Error('Parameter should not be null or undefined. Parameter: ' + schema.layout);
        }

        if (schema.entities === undefined || schema.entities === null) {
            throw Error('Parameter should not be null or undefined. Parameter: ' + schema.entity);
        }

        if (entityName === null || entityName === undefined) {
            throw Error(`'mergeFields' received invalid parameters. Parameter should not be not or undefined. Parameter name: entityName`);
        }

        if (layoutName === null || layoutName === undefined) {
            throw Error(`'mergeFields' received invalid parameters. Parameter should not be not or undefined. Parameter name: layoutName`);
        }

        let entity = _.find(schema.entities, e => e.name === entityName);
        if (!entity) {
            throw Error(`Could not find entity. Entity name: ${entityName}`);
        }
        let layout = _.find(schema.layouts, l => l.name === layoutName);
        if (!layout) {
            throw Error(`Could not find layout. Layout name: ${layoutName}`);
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