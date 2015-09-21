import _ from 'underscore';
import console from '../lib/helpers/consoleHelpers.js';

class MetadataProvider {

    /**
     * Validates a field metadata
     * @param metadata
     * @private
     */
    validateFieldMetadata(metadata) {
        if (!metadata) throw Error('metadata should not be null or undefined');
        if (!metadata.name) throw Error('metadata\'s "name" property is required');
        if (!metadata.type) throw Error('metadata\'s "type" property is required');
    }

    /**
     * Gets a raw entity from the given schema. No processing.
     * @param schema
     * @param entityName
     * @returns {*}
     */
    getEntity(schema, entityName) {
        if (schema === null || schema === undefined) {
            throw new Error(`Parameter should not be not or undefined. Parameter name: schema`);
        }

        if (schema.entities === undefined || schema.entities === null) {
            throw new Error('Parameter should not be null or undefined. Parameter: ' + schema.entity);
        }

        if (entityName === null || entityName === undefined) {
            throw new Error(`Parameter should not be not or undefined. Parameter name: entityName`);
        }
        let entity = _.find(schema.entities, e => e.name === entityName);
        if (!entity) {
            throw new Error(`Could not find entity. Entity name: ${entityName}`);
        }
        return entity;
    }

    /**
     * Gets a raw layout from the given entity. No processing.
     * @param entity
     * @param layoutName
     * @returns {*}
     */
    getLayout(entity, layoutName) {
        if (entity === null || entity === undefined) {
            throw new Error(`Parameter should not be not or undefined. Parameter name: entity`);
        }
        let layout = _.find(entity.layouts, l => l.name === layoutName);
        if (!layout) {
            throw new Error(`Could not find layout. Layout name: ${layoutName}`);
        }
        return layout;
    }

    /**
     * Gets a raw entity and a raw layout from the given schema.
     * @param schema
     * @param entityName
     * @param layoutName
     * @returns {{entity: *, layout: *}}
     */
    getEntityAndLayout(schema, entityName, layoutName) {

        let entity = this.getEntity(schema, entityName);
        let layout = this.getLayout(entity, layoutName);

        return {
            entity: entity,
            layout: layout
        }
    }

    /**
     * Internal method for merging entity and layout fields
     * @param schema
     * @param entity
     * @param layout
     * @param prefix
     * @param partialResult
     * @return {Number}
     */
    getFieldsInternal(schema, entity, layout, partialResult) {

        if(!entity) {
            throw Error('Paramater is fucked');
        }

        if (!partialResult) {
            partialResult = [];
        }

        let thisGroupFields = [];

        if (!layout.fields && !layout.groups) {
            throw Error('a layout can either have fields or groups. Never both.');
        }

        if (layout.groups) {
            for (let i = 0; i < layout.groups.length; i++) {
                thisGroupFields = _.union(thisGroupFields, this.getFieldsInternal(schema, entity, layout.groups[i], partialResult));
            }
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
                    field.fields = this.getFieldsInternal(schema, entityAndLayout.entity, entityAndLayout.layout, partialResult);
                }
            }
        }
        else {
            throw Error('a layout must have either fields or groups.');
        }
        return _.union(partialResult, thisGroupFields);

    }

    /**
     * Merges the given field collection
     * @param schema
     * @param entity
     * @param layout
     * @external https://github.com/gearz-lab/react-metaform/blob/master/docs-md/MetadataProvider.md
     */
    getFields(schema, entity, layout) {
        entity = typeof entity === 'string' ? this.getEntity(schema, entity) : entity;
        layout = typeof layout === 'string' ? this.getLayout(entity, layout) : layout;

        return this.getFieldsInternal(schema, entity, layout);
    }

    /**
     * Creates a clone of the given layout-group that maintains only the hierarchy and the 'name' property
     * for fields
     * @param layoutGroup
     * @returns {Object}
     */
    processLayoutGroup(layoutGroup) {

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
                layoutGroup.groups.push(this.processLayoutGroup(layoutGroup.groups[i]));
            }
        }

        return layoutGroupClone;
    }

    processLayout(schema, entity, layout) {
        entity = typeof entity === 'string' ? this.getEntity(schema, entity) : entity;
        layout = typeof layout === 'string' ? this.getLayout(entity, layout) : layout;

        return this.processLayoutGroup(layout);
    }
}

export default new MetadataProvider();
