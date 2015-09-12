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

    getEntityAndLayout(schema, entityName, layoutName) {

        let entity = this.getEntity(schema, entityName);
        let layout = this.getLayout(entity, layoutName);

        return {
            entity: entity,
            layout: layout
        }
    }

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
                    field.layout = this.processLayout(schema, field.entityName, field.layoutName);
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
     * @param entityName
     * @layoutName layoutName
     */
    getFields(schema, entityName, layoutName) {
        let entityAndLayout = this.getEntityAndLayout(schema, entityName, layoutName);
        return this.getFieldsInternal(schema, entityAndLayout.entity, entityAndLayout.layout);
    }

    processLayoutGroup(layoutGroup) {
        let layoutGroupCopy = _.extend({}, layoutGroup);
        if (layoutGroupCopy.fields) {
            for (let i = 0; i < layoutGroupCopy.fields.length; i++) {
                layoutGroupCopy.fields[i] = { name: layoutGroupCopy.fields[i].name };
            }
        }
        else if (layoutGroupCopy.groups) {
            for (let i = 0; i < layoutGroupCopy.groups.length; i++) {
                layoutGroupCopy.groups[i] = this.processLayoutGroup(layoutGroupCopy.groups[i]);
            }
        }

        // remove every property that is not 'groups' and 'fields'
        _.each(_.keys(layoutGroupCopy), i => {
            if (i == 'groups' || i == 'fields') {
                return;
            }
            delete layoutGroupCopy[i];
        });

        return layoutGroupCopy;
    }

    processLayout(schema, entityName, layoutName) {
        let entityAndLayout = this.getEntityAndLayout(schema, entityName, layoutName);
        return this.processLayoutGroup(entityAndLayout.layout);
    }
}

export default new MetadataProvider();
