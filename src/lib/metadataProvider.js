import _ from 'underscore';

export default {

    /**
     * Validates a field metadata
     * @param metadata
     * @private
     */
    validateFieldMetadata: function(metadata) {
        if (!metadata) throw Error('metadata should not be null or undefined');
        if (!metadata.name) throw Error('metadata\'s "name" property is required');
        if (!metadata.type) throw Error('metadata\'s "type" property is required');
    },

    /**
     * Gets a raw entity from the given schema. No processing.
     * @param schema
     * @param entityName
     * @returns {*}
     */
    getEntity: function(schema, entityName) {
        if (!schema) throw Error('\'schema\' should be truthy');
        if (!entityName) throw Error('\'entityName\' should be truthy');
        if (schema.entities === undefined || schema.entities === null) throw Error('schema should have entities');

        let entity = _.find(schema.entities, e => e.name === entityName);
        if (!entity) throw Error(`Could not find entity. Entity name: ${entityName}`);
        return entity;
    },

    /**
     * Gets a raw layout from the given entity. No processing.
     * @param entity
     * @param layoutName
     * @returns {*}
     */
    getLayout: function(entity, layoutName) {
        if (!entity) throw Error('\'entity\' should be truthy');
        let layout = _.find(entity.layouts, l => l.name === layoutName);
        if (!layout) throw Error(`Could not find layout. Layout name: ${layoutName}`);
        return layout;
    },

    /**
     * Gets a raw entity and a raw layout from the given schema.
     * @param schema
     * @param entityName
     * @param layoutName
     * @returns {{entity: *, layout: *}}
     */
    getEntityAndLayout: function(schema, entityName, layoutName) {
        let entity = this.getEntity(schema, entityName);
        let layout = layoutName ? this.getLayout(entity, layoutName) : this.generateDefaultLayout(schema, entity);

        return {
            entity: entity,
            layout: layout
        }
    },

    /**
     * Internal method for merging entity and layout fields
     * @param schema
     * @param entity
     * @param layout
     * @param prefix
     * @param partialResult
     * @return {Number}
     */
    getFieldsInternal: function(schema, entity, layout, partialResult, callback) {

        if (!schema) throw Error('\'schema\' should be truthy');
        if (!entity) throw Error('\'entity\' should be truthy');
        if (!layout.fields && !layout.groups) throw Error('A layout can either have fields or groups. Never both or none.');

        partialResult = partialResult || [];
        let thisGroupFields = [];

        if (layout.groups) {
            _.each(layout.groups, g => { thisGroupFields = _.union(thisGroupFields, this.getFieldsInternal(schema, entity, g, partialResult, callback)) });
        }

        else if (layout.fields) {

            for (let i = 0; i < layout.fields.length; i++) {

                let groupField = layout.fields[i];
                let existingEntityProperty = _.find(entity.fields, field => field.name == groupField.name);

                if (!existingEntityProperty) {
                    throw Error(`cannot find entity field. Field: ${groupField.name}. Group: ${layout}`);
                }

                let field = _.extend({}, existingEntityProperty, groupField);
                this.validateFieldMetadata(field);

                thisGroupFields.push(field);

                if (field.type == 'entity') {



                    if (!field.entityName) {
                        throw Error('when a field is of type \'entity\', it needs to specify an \'entityName\'')
                    }
                    if (!field.layoutName) {
                        throw Error('when a field is of type \'entity\', it needs to specify a \'layoutName\'');
                    }

                    let entityAndLayout = this.getEntityAndLayout(schema, field.entityName, field.layoutName);
                    field.layout = this.processLayout(schema, entityAndLayout.entity, entityAndLayout.layout);
                    field.fields = this.getFieldsInternal(schema, entityAndLayout.entity, entityAndLayout.layout, partialResult, callback);
                }

                if (field.type == 'array') {
                    if (!field.arrayType) {
                        throw Error('when a field is of type \'array\', it needs to specify an \'arrayType\'');
                    }

                    if (field.arrayType != 'entity') {
                        throw Error('only entity arrays are currently supported');
                    }

                    if (!field.entityType) {
                        throw Error('when a field is of type \'array\' and arrayType is \'entity\', it needs to specify an \'entityType\'');
                    }

                    if (!field.layoutName) {
                        throw Error('when a field is of type \'entity\', it needs to specify a \'layoutName\'');
                    }

                    let entityAndLayout = this.getEntityAndLayout(schema, field.entityType, field.layoutName);
                    field.layout = this.processLayout(schema, entityAndLayout.entity, entityAndLayout.layout);
                    field.fields = this.getFieldsInternal(schema, entityAndLayout.entity, entityAndLayout.layout, partialResult, callback);
                }

                if (callback) {
                    callback(field);
                }
            }
        }
        else {
            throw Error('a layout must have either fields or groups.');
        }
        return _.union(partialResult, thisGroupFields);

    },

    /**
     * Merges the given field collection
     * @param schema
     * @param entity
     * @param layout
     * @external https://github.com/gearz-lab/react-metaform/blob/master/docs-md/MetadataProvider.md
     */
    getFields: function(schema, entity, layout, callback) {
        entity = typeof entity === 'string' ? this.getEntity(schema, entity) : entity;
        if (!layout) {
            layout = this.generateDefaultLayout(schema, entity);
        }
        else {
            layout = typeof layout === 'string' ? this.getLayout(entity, layout) : layout;
        }
        return this.getFieldsInternal(schema, entity, layout, undefined, callback);
    },

    /**
     * Creates a clone of the given layout-group that maintains only the hierarchy and the 'name' property
     * for fields
     * @param layoutGroup
     * @returns {Object}
     */
    processLayoutGroup: function(layoutGroup) {
        if (!layoutGroup) throw Error('\'layoutGroup\' should be truthy');

        let layoutGroupClone = {};
        if (layoutGroup.fields) {
            layoutGroupClone.fields = [];
            for (let i = 0; i < layoutGroup.fields.length; i++) {
                layoutGroupClone.fields.push({ name: layoutGroup.fields[i].name });
            }
        }
        else if (layoutGroup.groups) {
            layoutGroupClone.groups = [];
            for (let i = 0; i < layoutGroup.groups.length; i++) {
                layoutGroupClone.groups.push(this.processLayoutGroup(layoutGroup.groups[i]));
            }
        }

        // copying useful properties
        layoutGroupClone.orientation = layoutGroup.orientation;
        layoutGroupClone.component = layoutGroup.component;
        layoutGroupClone.title = layoutGroup.title;

        return layoutGroupClone;
    },

    processLayout: function(schema, entity, layout) {
        entity = typeof entity === 'string' ? this.getEntity(schema, entity) : entity;
        layout = typeof layout === 'string' ? this.getLayout(entity, layout) : layout;

        return this.processLayoutGroup(layout);
    },

    /**
     * Generates a default layout for the given entity. Useful so it's not obligatory to implement layouts.
     * @param schema application schema
     * @param entity
     */
    generateDefaultLayout: function(schema, entity) {
        entity = typeof entity === 'string' ? this.getEntity(schema, entity) : entity;
        return {
            name: `${entity.name}-default`,
            fields: entity.fields.map(f => {
                return {
                    name: f.name
                };
            })
        };
    },

    /**
     * Gets the field-list for Redux-Form
     * @param fieldMetadata
     * @param prefix
     */
    getReduxFormFields: function(fieldMetadata, prefix) {
        if (!fieldMetadata) throw Error('fieldMetadata should be truthy');
        let result = [];

        _.each(fieldMetadata, f => {
            if (f.fields){
                // if a field has fields, it's either an array or a complex object
                let fieldPrefix = f.type == 'array' ? `${f.name}[]` : f.name;
                let totalPrefix = prefix ? `${prefix}.${fieldPrefix}` : fieldPrefix;
                this.getReduxFormFields(f.fields, totalPrefix).map(f2 => result.push(f2));
            }
            else {
                result.push(prefix ? `${prefix}.${f.name}` : f.name)
            }
        });
        
        return result;
    }
};